import React from "react";

import { useDispatch, useSelector } from "react-redux";

import AuthActions from "../../../store/ducks/auth";

/**
 * Creators
 */
import { Creators as ViewCreators } from "../../../store/ducks/view";
import { Creators as FunCreators } from "../../../store/ducks/funcionario";
import { Creators as BoxCreators } from "../../../store/ducks/box";
import { Creators as PasteCreators } from "../../../store/ducks/paste";
import { Creators as FamilyCreators } from "../../../store/ducks/family";
import { Creators as AddrressPrefecture } from "../../../store/ducks/address_prefecture";
import { Creators as ContactPrefecture } from "../../../store/ducks/contact_prefecture";
import { Creators as LogCreators } from "../../../store/ducks/log";

import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles
} from "@material-ui/core/";

import {
  Person,
  Home,
  ExitToApp,
  HomeWorkOutlined,
  Group,
  Description,
  Wc,
  AllInbox,
  FileCopy
} from "@material-ui/icons/";

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0
    }
  },
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth
    }
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none"
    }
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  }
}));

export default function LeftBar() {
  const classes = useStyles();

  const dispatch = useDispatch();

  const user = useSelector(state => state.user.user.admin);

  return (
    <div style={{ backgroundColor: "rgb(10,103,30)" }}>
      <div
        className={classes.toolbar}
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#D8D8D8",
          height: "150px"
        }}
      >
        <Home
          style={{
            fontSize: 100,
            color: "rgb(2,99,44)",
            margin: "10px"
          }}
        />
      </div>

      {user === true ? (
        <>
          <ListItem
            button
            style={{ backgroundColor: "rgba(2,99,44,0.7)" }}
            onClick={() => {
              dispatch(ContactPrefecture.failLoadPrefectureContact(false));
              dispatch(ContactPrefecture.readPrefectureContactRequest());
              dispatch(AddrressPrefecture.readAddressPrefectureRequest());
              dispatch(ViewCreators.changerView("prefeitura"));
            }}
          >
            <ListItemIcon>
              <HomeWorkOutlined
                style={{ fontSize: "35", color: "rgb(246,238,89)" }}
              />
            </ListItemIcon>
            <ListItemText
              style={{ color: "rgb(246,238,89)", fontSize: "10px" }}
            >
              Prefeitura
            </ListItemText>
          </ListItem>
          <ListItem
            button
            style={{
              backgroundColor: "rgba(2,99,44,0.7)"
            }}
            onClick={() => {
              dispatch(FunCreators.loadFuncionarioRequest());
              dispatch(ViewCreators.changerView("funcionario"));
            }}
          >
            <ListItemIcon>
              <Group style={{ fontSize: "35", color: "rgb(246,238,89)" }} />
            </ListItemIcon>
            <ListItemText
              style={{ color: "rgb(246,238,89)", fontSize: "10px" }}
            >
              Funcionario
            </ListItemText>
          </ListItem>
          <ListItem
            button
            style={{ backgroundColor: "rgba(2,99,44,0.7)" }}
            onClick={() => {
              dispatch(LogCreators.readLogRequest());
              dispatch(ViewCreators.changerView("gerar"));
            }}
          >
            <ListItemIcon>
              <Description
                style={{ fontSize: "35", color: "rgb(246,238,89)" }}
              />
            </ListItemIcon>
            <ListItemText
              style={{ color: "rgb(246,238,89)", fontSize: "10px" }}
            >
              Log
            </ListItemText>
          </ListItem>
        </>
      ) : (
        <></>
      )}

      <List style={{ paddingTop: "0px", paddingBottom: "0px" }}>
        <ListItem
          button
          style={{
            backgroundColor: "rgba(2,99,44,0.7)"
          }}
          onClick={() => {
            dispatch(ViewCreators.changerView("perfil"));
          }}
        >
          <ListItemIcon>
            <Person style={{ fontSize: "35", color: "rgb(246,238,89)" }} />
          </ListItemIcon>
          <ListItemText style={{ color: "rgb(246,238,89)", fontSize: "10px" }}>
            Perfil
          </ListItemText>
        </ListItem>

        <ListItem
          button
          style={{ backgroundColor: "rgba(2,99,44,0.7)" }}
          onClick={() => {
            dispatch(BoxCreators.readBoxesRequest());
            dispatch(ViewCreators.changerView("box"));
          }}
        >
          <ListItemIcon>
            <AllInbox style={{ fontSize: "35", color: "rgb(246,238,89)" }} />
          </ListItemIcon>
          <ListItemText style={{ color: "rgb(246,238,89)", fontSize: "10px" }}>
            Caixa
          </ListItemText>
        </ListItem>

        <ListItem
          button
          style={{ backgroundColor: "rgba(2,99,44,0.7)" }}
          onClick={() => {
            dispatch(PasteCreators.readPastesRequest());
            dispatch(ViewCreators.changerView("pasta"));
          }}
        >
          <ListItemIcon>
            <FileCopy style={{ fontSize: "35", color: "rgb(246,238,89)" }} />
          </ListItemIcon>
          <ListItemText style={{ color: "rgb(246,238,89)", fontSize: "10px" }}>
            Pasta
          </ListItemText>
        </ListItem>

        <ListItem
          button
          style={{ backgroundColor: "rgba(2,99,44,0.7)" }}
          onClick={() => {
            dispatch(FamilyCreators.readFamilyRequest());
            dispatch(ViewCreators.changerView("familiar"));
          }}
        >
          <ListItemIcon>
            <Wc style={{ fontSize: "35", color: "rgb(246,238,89)" }} />
          </ListItemIcon>
          <ListItemText style={{ color: "rgb(246,238,89)", fontSize: "10px" }}>
            Grupo Familiar
          </ListItemText>
        </ListItem>

        <ListItem
          button
          style={{ backgroundColor: "rgba(2,99,44,0.7)" }}
          onClick={() => {
            dispatch(AuthActions.signOut());
            dispatch(ViewCreators.changerView("default"));
          }}
        >
          <ListItemIcon>
            <ExitToApp style={{ fontSize: "35", color: "rgb(246,238,89)" }} />
          </ListItemIcon>
          <ListItemText style={{ color: "rgb(246,238,89)", fontSize: "10px" }}>
            Sair
          </ListItemText>
        </ListItem>
      </List>
    </div>
  );
}