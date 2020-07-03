import React, { useEffect } from "react";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { Page, Text, View, Document, PDFViewer } from "@react-pdf/renderer";

import { Creators as BoxCreators } from "../../../store/ducks/box";
import { Creators as GeneratorCreators } from "../../../store/ducks/generator";

import styled from "@react-pdf/styled-components";
import moment from "moment";

const SubText = styled.Text`
  font-size: 14px;
`;

/* Informações da pasta */

const Container = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  width: 160px;
  padding: 2px;
`;

const ContainerBox = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  width: 20%;
  padding: 2px;
`;

const List = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  margin: 5px;
  padding: 5px;
`;

const Area = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  margin: 5px;
  padding: 5px;
`;

const TextArea = styled.View`
  width: 160px;
  height: auto;
`;

const Atributes = styled.Text`
  font-size: 12px;
`;

const Result = styled.Text`
  margin-top: 3px;
  font-size: 10px;
`;

/* Tabela grupo familiar */

const SubTitle = styled.Text`
  font-size: 10px;
  margin-left: 2px;
`;

const PDF = (props) => {
  useEffect(() => {
    const { generateRelationshipBoxFamiliesRequest } = props;
    generateRelationshipBoxFamiliesRequest();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { prefecture } = props.redux.prefecture;

  const { relationBoxFamily } = props.redux.generator;

  function load(data) {
    if (Array.isArray(data)) {
      return true;
    } else {
      return false;
    }
  }

  return (
    <>
      {load(relationBoxFamily) === false ? (
        <>
          <h3
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              alignContent: "center",
            }}
          >
            Carregando
          </h3>
        </>
      ) : (
        <>
          <PDFViewer width="100%" height="100%">
            <Document title="Relatorio geral">
              <Top prefecture={prefecture} />

              {relationBoxFamily.map((box) => (
                <Page>
                  <Text
                    render={({ pageNumber, totalPages }) =>
                      `${pageNumber} / ${totalPages}`
                    }
                    fixed
                  />
                  <Paste box={box} />
                  <Footer />
                </Page>
              ))}
            </Document>
          </PDFViewer>
        </>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  redux: state,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ ...BoxCreators, ...GeneratorCreators }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(PDF);

const Top = ({ prefecture }) => {
  const date = getToday();

  return (
    <Header>
      <PrefectureTitle>
        <Text>{prefecture.nome}</Text>
      </PrefectureTitle>

      <View style={{ display: "flex", flexDirection: "column" }}>
        <Data>
          <Text>{date}</Text>
        </Data>
        <TextInformation>
          <Text>Relatorio geral</Text>
        </TextInformation>
      </View>
    </Header>
  );
};

const Header = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 5px;
  padding: 5px;
`;

const PrefectureTitle = styled.View`
  font-size: 14px;
  width: 50%;
`;

const Data = styled.Text`
  font-size: 10px;
`;

const TextInformation = styled.Text`
  margin-top: 5px;
  font-size: 10px;
`;

function getToday() {
  var data = new Date(),
    dia = data.getDate().toString().padStart(2, "0"),
    mes = (data.getMonth() + 1).toString().padStart(2, "0"), //+1 pois no getMonth Janeiro começa com zero.
    ano = data.getFullYear();
  return dia + "/" + mes + "/" + ano;
}

function dateFormat(data) {
  const date = moment(data).format("DD/MM/YYYY");
  return date;
}

/**

 <PDFViewer style={{ width: "100%", height: "100%" }}>
      
      <Document title="Relatorio geral">
        <Page size="A4" wrap>
          <View>
            <Top prefecture={prefecture} />
            
             
              <View>
                {[].map(box => (
                  <View key={box.id}>
                    <List
                      style={{
                        borderWidth: 1,
                        borderColor: "#999",
                        borderStyle: "solid"
                      }}
                    >
                      <SubText>Informações da pasta</SubText>
                    </List>
                    <List>
                      <Container>
                        <Atributes>código:</Atributes>
                        <Result>{box.id}</Result>
                      </Container>
                      <Container>
                        <Atributes>código domiciliar:</Atributes>
                        <Result>{box.codHome}</Result>
                      </Container>
                      <Container>
                        <Atributes>data da entrevista:</Atributes>
                        <Result>{formatDate(box.dateInterview)}</Result>
                      </Container>
                    </List>
                    <List>
                      <Container>
                        <Atributes>caixa:</Atributes>
                        <Result>{box.numBox}</Result>
                      </Container>
                      <Container>
                        <Atributes>pasta:</Atributes>
                        <Result>{box.numPaste}</Result>
                      </Container>
                      <Container>
                        <Atributes>data da visita:</Atributes>
                        <Result>{formatDate(box.dateVisit)}</Result>
                      </Container>
                    </List>

                    <List>
                      <ContainerBox>
                        <Atributes>situação:</Atributes>
                        <Result>
                          {box.situation === true ? "ativa" : "desativada"}
                        </Result>
                      </ContainerBox>
                      <ContainerBox>
                        <Atributes>deficiente:</Atributes>
                        <Result>
                          {box.deficient === true ? "sim" : "não"}
                        </Result>
                      </ContainerBox>
                      <ContainerBox>
                        <Atributes>idoso:</Atributes>
                        <Result>{box.oldman === true ? "sim" : "não"}</Result>
                      </ContainerBox>
                      <ContainerBox>
                        <Atributes>bpc:</Atributes>
                        <Result>{box.benefit === true ? "sim" : "não"}</Result>
                      </ContainerBox>
                      <ContainerBox>
                        <Atributes>pasta no local:</Atributes>
                        <Result>{box.local === true ? "sim" : "não"}</Result>
                      </ContainerBox>
                    </List>
                    <Area>
                      <TextArea>
                        <Atributes>observação:</Atributes>
                        <Result>{box.reason}</Result>
                      </TextArea>
                      <TextArea>
                        <Atributes>motivo:</Atributes>
                        <Result>{box.note}</Result>
                      </TextArea>
                    </Area>
                    <List
                      style={{
                        borderWidth: 1,
                        borderColor: "#999",
                        borderStyle: "solid"
                      }}
                    >
                      <SubText>Informações do grupo familiar</SubText>
                    </List>
                    <Table>
                      <ColumnAlign>
                        <ColumnName>
                          <Title>nome</Title>
                        </ColumnName>
                        <OthersColumns>
                          <Title>cpf</Title>
                        </OthersColumns>
                        <OthersColumns>
                          <Title>nis</Title>
                        </OthersColumns>
                        <OthersColumns>
                          <Title>tipo</Title>
                        </OthersColumns>
                        <OthersColumns>
                          <Title>situação</Title>
                        </OthersColumns>
                      </ColumnAlign>

                      {box.family.map(familiar => (
                        <View key={familiar.id}>
                          <ColumnAlign>
                            <ResultName>
                              <SubTitle>{familiar.nome}</SubTitle>
                            </ResultName>
                            <OthersColumns>
                              <SubTitle>{familiar.cpf}</SubTitle>
                            </OthersColumns>
                            <OthersColumns>
                              <SubTitle>{familiar.nis}</SubTitle>
                            </OthersColumns>
                            <OthersColumns>
                              <SubTitle>{familiar.tipo}</SubTitle>
                            </OthersColumns>
                            <OthersColumns>
                              <SubTitle>{familiar.situacao}</SubTitle>
                            </OthersColumns>
                          </ColumnAlign>
                        </View>
                      ))}
                    </Table>
                 
              </View>
            )}
            
          </View>
        </Page>
      </Document>
    </PDFViewer>



 */

const Footer = () => {
  return (
    <View
      style={{
        position: "absolute",
        bottom: "1px",
        width: "100%",
        textAlign: "center",
      }}
    >
      <View style={{ display: "flex", flexDirection: "row" }}>
        <SubTitle>
          Desenvolvido por CTM consultoria - CNPJ - 26.742.864/0001-72 R: José
          Lins de Siqueira Brito, Nº 186, Arcoverde-PE, 56506-510
        </SubTitle>
      </View>
    </View>
  );
};

const Paste = ({ box }) => {
  return (
    <View>
      <List
        style={{
          borderWidth: 1,
          borderColor: "#999",
          borderStyle: "solid",
        }}
      >
        <SubText>Informações da pasta</SubText>
      </List>
      <List>
        <Container>
          <Atributes>código:</Atributes>
          <Result>{box.id}</Result>
        </Container>
        <Container>
          <Atributes>código domiciliar:</Atributes>
          <Result>{box.codHome}</Result>
        </Container>
        <Container>
          <Atributes>data da entrevista:</Atributes>
          <Result>{dateFormat(box.dateInterview)}</Result>
        </Container>
      </List>
      <List>
        <Container>
          <Atributes>caixa:</Atributes>
          <Result>{box.numBox}</Result>
        </Container>
        <Container>
          <Atributes>pasta:</Atributes>
          <Result>{box.numPaste}</Result>
        </Container>
        <Container>
          <Atributes>data da visita:</Atributes>
          <Result>{dateFormat(box.dateVisit)}</Result>
        </Container>
      </List>

      <List>
        <ContainerBox>
          <Atributes>situação:</Atributes>
          <Result>{box.situation === true ? "ativa" : "desativada"}</Result>
        </ContainerBox>
        <ContainerBox>
          <Atributes>deficiente:</Atributes>
          <Result>{box.deficient === true ? "sim" : "não"}</Result>
        </ContainerBox>
        <ContainerBox>
          <Atributes>idoso:</Atributes>
          <Result>{box.oldman === true ? "sim" : "não"}</Result>
        </ContainerBox>
        <ContainerBox>
          <Atributes>bpc:</Atributes>
          <Result>{box.benefit === true ? "sim" : "não"}</Result>
        </ContainerBox>
        <ContainerBox>
          <Atributes>pasta no local:</Atributes>
          <Result>{box.local === true ? "sim" : "não"}</Result>
        </ContainerBox>
      </List>
      <Area>
        <TextArea>
          <Atributes>observação:</Atributes>
          <Result>{box.reason}</Result>
        </TextArea>
        <TextArea>
          <Atributes>motivo:</Atributes>
          <Result>{box.note}</Result>
        </TextArea>
      </Area>
    </View>
  );
};