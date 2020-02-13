import React, { useState } from "react";

import { useSelector, useDispatch } from "react-redux";

import { Creators as BoxCreators } from "../../../store/ducks/box";
import { Creators as ViewCreators } from "../../../store/ducks/view";

import MaterialTable from "material-table";

import ModalCreate from "./Create";
import ModalUpdate from "./View";

export default function() {
  const [state, setState] = useState({
    columns: [
      {
        title: "id",
        field: "id",
        headerStyle: {
          color: "rgb(2,90,10)"
        }
      },
      {
        title: "Numero da caixa",
        field: "numBox",
        headerStyle: {
          color: "rgb(2,90,10)"
        }
      },
      {
        title: "Quantidade maxima de pastas",
        field: "numMax",
        headerStyle: {
          color: "rgb(2,90,10)"
        }
      }
    ]
  });

  const [selectedRow, setSelectedRow] = useState("");

  const data = useSelector(state => state.box.boxes);

  const dispatch = useDispatch();

  function load(data) {
    if (Array.isArray(data)) {
      return true;
    } else {
      return false;
    }
  }

  return (
    <>
      {load(data) === true ? (
        <>
          <MaterialTable
            style={{
              height: "700px",
              boxShadow: "none",
              color: "rgb(2,99,44)"
            }}
            title="Caixas"
            columns={state.columns}
            data={data}
            editable={{
              onRowDelete: oldData =>
                new Promise(resolve => {
                  setTimeout(() => {
                    resolve();
                    dispatch(BoxCreators.deleteBoxRequest(oldData.id));
                  }, 600);
                })
            }}
            onRowClick={(evt, selectedRow) => {
              setSelectedRow(selectedRow);
            }}
            options={{
              rowStyle: rowData => ({
                backgroundColor:
                  selectedRow &&
                  selectedRow.tableData.id === rowData.tableData.id
                    ? "#F3F781"
                    : "#FFF"
              })
            }}
            actions={[
              {
                icon: "add",
                tooltip: "Add User",
                isFreeAction: true,
                onClick: (event, rowData) => {
                  dispatch(BoxCreators.showModalNewBox());
                }
              },
              {
                icon: "visibility",
                tooltip: "Mostrar pastas",
                onClick: (event, rowData) => {
                  dispatch(ViewCreators.changerView("pastesBox"));
                  dispatch(BoxCreators.readPastesRequest(rowData.id));
                }
              },
              {
                icon: "edit",
                tooltip: "Editar caixa",
                onClick: (event, rowData) => {
                  dispatch(BoxCreators.showModalUpdateBox(rowData));
                }
              }
            ]}
          />

          <ModalCreate />
          <ModalUpdate />
        </>
      ) : (
        <></>
      )}
    </>
  );
}
