import React, { useState, useEffect } from "react";


import { cnpjMask } from "../../../Components/TextField/MaskCnpj";

import TextField from "../../../Components/TextField/index";

import { Modal, Grid, Typography, Button } from "@material-ui/core/";
import { toastr } from "react-redux-toastr";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  main: {
    backgroundColor: "#fff",
    padding: "20px",
    border: "1px solid #D8D8D8",
    borderRadius: "5px",

    [theme.breakpoints.down("sm")]: {
      width: "100%",
      height: "100%",
    },
    [theme.breakpoints.up("md")]: {
      width: "700px",
    },
  },
}));

function View(props) {
  const { prefecture } = props.redux.prefecture;
  const { visible } = props.redux.prefecture.prefecture_update;

  const [cnpj, setCnpj] = useState("");
  const [nome, setNome] = useState("");
  const [razao, setRazao] = useState("");
  const [numero, setNumero] = useState("");

  const { hideModalUpdatePrefecture, updatePrefectureRequest } = props;

  const classes = useStyles();

  useEffect(() => {
    setCnpj(prefecture.cnpj);
    setNome(prefecture.nome);
    setRazao(prefecture.razao);
    setNumero(prefecture.numero);
  }, [prefecture]);

  function changerCnpj(e) {
    setCnpj(cnpjMask(e.target.value, cnpj));
  }

  function saveInformation() {
    console.log(prefecture);
    try {
      var pref = {
        id: prefecture.id,
        cnpj,
        nome,
        razao,
        numero,
      };

      checkAttributesObj(pref);

      updatePrefectureRequest(pref);
    } catch (err) {
      toastr.error("Preencha todos os campos");
    }
  }

  function checkAttributesObj(obj) {
    // eslint-disable-next-line no-unused-vars
    for (var [key, value] of Object.entries(obj)) {
      if (typeof value === "undefined" || value === null || value === "") {
        throw new UserException("Null");
      }
    }
  }

  function UserException(message) {
    this.message = message;
    this.name = "UserException";
  }

  return (
    <>
      <Modal
        open={visible}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          overflowX: "visible",
          overflowY: "scroll",
        }}
      >
        <div className={classes.main}>
          <Typography
            variant="h4"
            style={{
              color: "rgb(2,99,44)",
              justifyContent: "center",
              textAlign: "center",
              marginBottom: "15px",
            }}
          >
            Prefeitura
          </Typography>
          <Typography
            variant="h5"
            style={{
              color: "rgb(2,99,44)",
            }}
          >
            Informações
          </Typography>
          <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="flex-start"
          >
            <Grid item xs={12}>
              <form onBlur={saveInformation}>
                <Grid
                  container
                  direction="row"
                  justify="flex-start"
                  alignItems="flex-start"
                >
                  <Grid item xs={12} sm={6} style={{ marginTop: "15px" }}>
                    <div>
                      <Typography
                        variant="subtitle2"
                        style={{ color: "#BDBDBD" }}
                      >
                        CNPJ:
                      </Typography>
                      <TextField
                        variant="outlined"
                        size="small"
                        fullWidth
                        value={cnpj}
                        onChange={changerCnpj}
                      />
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={2} />
                  <Grid item xs={12} sm={4} style={{ marginTop: "15px" }}>
                    <div>
                      <Typography
                        variant="subtitle2"
                        style={{ color: "#BDBDBD" }}
                      >
                        Numero de pastas
                      </Typography>
                      <TextField
                        variant="outlined"
                        size="small"
                        fullWidth
                        type="text"
                        value={numero}
                        onChange={(e) => setNumero(e.target.value)}
                      />
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={12} style={{ marginTop: "15px" }}>
                    <div>
                      <Typography
                        variant="subtitle2"
                        style={{ color: "#BDBDBD" }}
                      >
                        Nome fantasia:
                      </Typography>
                      <TextField
                        variant="outlined"
                        size="small"
                        fullWidth
                        type="text"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                      />
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={12} style={{ marginTop: "15px" }}>
                    <div>
                      <Typography
                        variant="subtitle2"
                        style={{ color: "#BDBDBD" }}
                      >
                        Razão:
                      </Typography>
                      <TextField
                        variant="outlined"
                        size="small"
                        fullWidth
                        type="text"
                        value={razao}
                        onChange={(e) => setRazao(e.target.value)}
                      />
                    </div>
                  </Grid>
                </Grid>
              </form>
            </Grid>
          </Grid>

          <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="flex-start"
          >
            <Grid item xs={12} sm={12} style={{ marginTop: "20px" }}>
              <div style={{ width: "100%" }}>
                <Button
                  onClick={hideModalUpdatePrefecture}
                  variant="contained"
                  style={{ width: "100%", color: "#FF0000", marginTop: "20px" }}
                >
                  Fechar
                </Button>
              </div>
            </Grid>
          </Grid>
        </div>
      </Modal>
    </>
  );
}


export default (View);
