import React from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

import faker from 'faker-br';
import {More} from '@material-ui/icons';
const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});

function createData(name, calories, fat, carbs, protein, price) {
  return {
    name,
    calories,
    fat,
    carbs,
    protein,
    price,
    history: [
      {date: '2020-01-05', customerId: '11091700', amount: 3},
      {date: '2020-01-02', customerId: 'Anonymous', amount: 1},
    ],
  };
}

function Row(props) {
  const {row} = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton
            aria-label='expand row'
            size='small'
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component='th' scope='row'>
          {row.name}
        </TableCell>
        <TableCell align='right'>{row.calories}</TableCell>
        <TableCell align='right'>{row.fat}</TableCell>
        <TableCell align='right'>{row.carbs}</TableCell>
        <TableCell align='right'>{row.protein}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{paddingBottom: 0, paddingTop: 0}} colSpan={6}>
          <Collapse in={open} timeout='auto' unmountOnExit>
            <Box margin={1}>
              <Typography variant='h6' gutterBottom component='div'>
                Dependentes
              </Typography>
              <Table size='small' aria-label='purchases'>
                <TableHead>
                  <TableRow>
                    <TableCell>Nome</TableCell>
                    <TableCell>CPF</TableCell>
                    <TableCell align='right'>NIS</TableCell>
                    <TableCell align='right'>Situação</TableCell>
                    <TableCell align='right'>Ações</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.history.map((historyRow) => (
                    <TableRow key={historyRow.date}>
                      <TableCell component='th' scope='row'>
                        {historyRow.date}
                      </TableCell>
                      <TableCell>{historyRow.customerId}</TableCell>
                      <TableCell align='right'>{historyRow.amount}</TableCell>
                      <TableCell align='right'>
                        {Math.round(historyRow.amount * row.price * 100) / 100}
                      </TableCell>
                      <TableCell>
                        <More />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    calories: PropTypes.number.isRequired,
    carbs: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    history: PropTypes.arrayOf(
      PropTypes.shape({
        amount: PropTypes.number.isRequired,
        customerId: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
      }),
    ).isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    protein: PropTypes.number.isRequired,
  }).isRequired,
};

const parseString = '' + new Date().getTime();
const nis = parseString.slice(0, 10);

console.log(faker.name.findName());

const rows = [
  createData(
    faker.name.findName(),
    faker.br.cpf(),
    nis,
    'Responsavel',
    'Ativo',
  ),
  createData(
    faker.name.findName(),
    faker.br.cpf(),
    nis,
    'Responsavel',
    'Ativo',
  ),
  createData(
    faker.name.findName(),
    faker.br.cpf(),
    nis,
    'Responsavel',
    'Ativo',
  ),
  createData(
    faker.name.findName(),
    faker.br.cpf(),
    nis,
    'Responsavel',
    'Ativo',
  ),
  createData(
    faker.name.findName(),
    faker.br.cpf(),
    nis,
    'Responsavel',
    'Ativo',
  ),
];

export default function CollapsibleTable() {
  return (
    <TableContainer component={Paper}>
      <Table aria-label='collapsible table'>
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Nome</TableCell>
            <TableCell align='right'>CPF</TableCell>
            <TableCell align='right'>NIS</TableCell>
            <TableCell align='right'>Tipo</TableCell>
            <TableCell align='right'>Situação</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.name} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
