package com.ProyectoWilson.demo.Service.Impl;

import com.ProyectoWilson.demo.DTO.Request.TurnoRequestDTO;
import com.ProyectoWilson.demo.DTO.Response.TurnoResponseDTO;
import com.ProyectoWilson.demo.Entities.Cliente;
import com.ProyectoWilson.demo.Entities.Turno;
import com.ProyectoWilson.demo.Exceptions.Cliente.ClienteNoExiste;
import com.ProyectoWilson.demo.Exceptions.Turno.TurnoNoExiste;
import com.ProyectoWilson.demo.Mapper.TurnoMapper;
import com.ProyectoWilson.demo.Repository.ClienteRepository;
import com.ProyectoWilson.demo.Repository.TurnoRepository;
import com.ProyectoWilson.demo.Service.Interfaces.TurnoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class TurnoServiceImpl implements TurnoService {

    @Autowired
    private ClienteRepository clienteRepository;

    @Autowired
    private TurnoMapper turnoMapper;

    @Autowired
    private TurnoRepository turnoRepository;

    @Override
    public TurnoResponseDTO agendarTurno(TurnoRequestDTO dto) {
        Cliente cliente = clienteRepository.findById(dto.getCedulaCliente()).orElseThrow(ClienteNoExiste::new);
        Turno turno = new Turno();
        turno.setFecha(dto.getFecha());
        turno.setClienteAsociado(cliente);
        turnoRepository.save(turno);
        cliente.getTurnos().add(turno);
        return turnoMapper.toResponseDTO(turno);
    }

    @Override
    public void reprogramarTurno(Long idTurno, TurnoRequestDTO dto) {
        Turno turno = turnoRepository.findById(idTurno).orElseThrow(TurnoNoExiste::new);
        turno.setClienteAsociado(clienteRepository.findById(dto.getCedulaCliente()).orElseThrow(ClienteNoExiste::new));
        turno.setFecha(dto.getFecha());
    }

    @Override
    public void cancelarTurno(Long idTurno) {
        Turno turno = turnoRepository.findById(idTurno).orElseThrow(TurnoNoExiste::new);
        turnoRepository.delete(turno);
    }

    @Override
    public List<TurnoResponseDTO> obtenerPorCliente(Long idCliente) {
        List<Turno> turnos = turnoRepository.findByClienteAsociadoCedula(idCliente);
        List<TurnoResponseDTO> retornar = new ArrayList<>();
        for(Turno turno: turnos){
            retornar.add(turnoMapper.toResponseDTO(turno));
        }
        return retornar;
    }

    @Override
    public List<TurnoResponseDTO> obtenerPorFechas(LocalDateTime fechaIni, LocalDateTime fechaFin) {
        List <Turno> turnos = turnoRepository.findByFechaBetween(fechaIni,fechaFin);
        List<TurnoResponseDTO>retornar = new ArrayList<>();
        for (Turno turno: turnos){
            retornar.add(turnoMapper.toResponseDTO(turno));
        }
        return retornar;
    }

    @Override
    public boolean existeTurnoEnHorario(LocalDateTime fecha) {
        return turnoRepository.existsByFecha(fecha);
    }

}
