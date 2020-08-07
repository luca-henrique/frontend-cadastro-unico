import React, { useEffect } from "react";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { Creators as LogCreators } from "~/store/ducks/log";

import MaterialTable from "material-table";
import { Modal, Backdrop } from "@material-ui/core/";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  modal: {
    [theme.breakpoints.down("sm")]: {
      paddingTop: theme.spacing(5),
      width: "100%",
      height: "80%",
      overflowY: "scroll",
    },
    [theme.breakpoints.up("md")]: {
      width: "70%",
    },
  },
}));

function View(props) {
  const open = props.redux.log.open;
  const data = props.redux.log.log;
  const loading = props.redux.log.loading;

  const { hideModalLog, readLogRequest } = props;

  const classes = useStyles();

  useEffect(() => {
    if (open) {
      readLogRequest();
    }
  }, [open, readLogRequest]);

  function changer(array) {
    const log = [];
    for (var i in array) {
      if (i < array.length - 1) {
        var json = JSON.parse(array[i].trim());
        log.push(json);
      }
    }
    return log;
  }

  return (
    <Modal
      open={open}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <div className={classes.modal}>
        <MaterialTable
          isLoading={loading}
          style={{
            height: "auto",
            boxShadow: "none",
            color: "rgb(2,99,44)",
          }}
          actions={[
            {
              icon: "close",
              tooltip: "Fechar",
              isFreeAction: true,
              onClick: (event, rowData) => {
                hideModalLog();
              },
            },
          ]}
          title="Log"
          data={changer(data)}
          localization={{
            header: {
              actions: "Ações",
            },

            body: {
              emptyDataSourceMessage: "Não existe",
              filterRow: {
                filterTooltip: "Procurar",
              },
            },
            toolbar: {
              searchTooltip: "Procurar",
              searchPlaceholder: "Procurar",
            },
          }}
          columns={[
            {
              title: "Url",
              field: "url",
            },
            {
              title: "Method",
              field: "method",
            },
            {
              title: "Usuario",
              field: "user_modified.email",
            },

            {
              title: "Data da modificação",
              field: "data_modified",
            },
            {
              title: "Horario da modificação",
              field: "hour_modified",
            },
          ]}
        />
      </div>
    </Modal>
  );
}

const mapStateToProps = (state) => ({
  redux: state,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ ...LogCreators }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(View);
