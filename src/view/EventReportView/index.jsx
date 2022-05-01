import React from 'react'
import MuiAlert from '@mui/material/Alert';
import { CardMedia, Box, Button, Snackbar } from '@mui/material'
import SupimpaLogo from '../../assets/supimpa.png'
import Header from '../../components/Header'
import './styles.css'

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function EventReportView(props) {
  const { eventInfo, handleGetReportClick } = props;
  const [showAlert, setShowAlert] = React.useState(false);
  const [eventStatus, setEventStatus] = React.useState(false);

  const handleShowAlert = (message) => {
    setEventStatus(message);
    setShowAlert(true)
  };

  const handleAlertClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setShowAlert(false);
  };

  if (!eventInfo) {
    return (
      <div>
        <Header />
        <h1>Evento não encontrado ou usuario não é seu criador</h1>
      </div>
    );
  }

  const {thumb, name, description, location, startDate, finishDate, ticketPrice, ticketsAvailable, ticketsSold, presentationList } = eventInfo;

  const sDate = new Date(startDate);
  const fDate = new Date(finishDate);

  return (
    <div>
      <Header />
      <Box className='presentationBox'>
        <CardMedia
          component="img"
          alt="evento"
          width="100%"
          height="140"
          src={thumb === "" ? SupimpaLogo : thumb}
        />
        <div className='eventCardInfo'>
          <div className='eventCardInfoBreak'>
            <h3 className='eventInfo'>{name}</h3>
          </div>
          <div className='eventCardInfoBreak'>
            <p className='eventInfo'>{description}</p>
          </div>
          <div className='eventCardInfoBreak'>
            <p className='eventInfo'>Local: {location}</p>
          </div>
          <div className='eventCardInfoBreak'>
            <p className='eventInfo'>Inicio: {
              ("0" + sDate.getUTCDate()).slice(-2) + "/" + ("0" + (sDate.getUTCMonth() + 1)).slice(-2) + "/" + sDate.getUTCFullYear()
            }</p>
            <p className='eventInfo'>Fim: {
              ("0" + fDate.getUTCDate()).slice(-2) + "/" + ("0" + (fDate.getUTCMonth() + 1)).slice(-2) + "/" + fDate.getUTCFullYear()
            }</p>
          </div>
          <div className='eventCardInfoBreak'>
            <p className='eventInfo'>Valor do ingresso: R${ticketPrice.toFixed(2)}</p>
            <p className='eventInfo'>Ingressos disponiveis: {ticketsAvailable}</p>
            <p className='eventInfo'>Ingressos vendidos: {ticketsSold}</p>
            <p className='eventInfo'>Total lucrado: R${(ticketsSold * ticketPrice).toFixed(2)}</p>
          </div>
          <div className='eventCardInfoBreak'>
            <p className='eventInfo'>Palestras cadastradas: {presentationList.length}</p>
            {presentationList.map((item) => (
              <p className='eventInfo'>{item.name}</p>
            ))}
          </div>
          <Button variant="contained" sx={{ m: 2 }} onClick={() => { handleGetReportClick(handleShowAlert); }} >Gerar relatorio</Button>
        </div>
      </Box>
      <Snackbar open={showAlert} onClose={handleAlertClose} autoHideDuration={3000}>
        {eventStatus === 201
          ? <Alert severity="success">Relatorio gerado com sucesso!</Alert>
          : <Alert severity="error">Falha ao gerar relatorio!</Alert>}
      </Snackbar>
    </div>
  )
}
