import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";


const tableContainerStyle = {
    //width: auto, // Установите желаемую ширину таблицы
    margin: "auto", // Центрируем таблицу на странице
  };

export default function FitnessTable() {
  return (
    
    <TableContainer component={Paper} style={tableContainerStyle}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Упражнение</TableCell>
            <TableCell align="right">Результат</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>Бег на 1 км</TableCell>
            <TableCell align="right">7 минут 32 секунды</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Отжимания</TableCell>
            <TableCell align="right">37</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Подтягивания</TableCell>
            <TableCell align="right">9</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Прыжок с места</TableCell>
            <TableCell align="right">110 см</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Вис на турнике</TableCell>
            <TableCell align="right">48 секунд</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
