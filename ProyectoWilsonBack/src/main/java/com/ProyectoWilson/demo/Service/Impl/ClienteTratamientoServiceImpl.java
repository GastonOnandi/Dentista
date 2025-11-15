package com.ProyectoWilson.demo.Service.Impl;

import com.ProyectoWilson.demo.Entities.Cliente;
import com.ProyectoWilson.demo.Entities.ClienteTratamiento;
import com.ProyectoWilson.demo.Entities.Tratamiento;
import com.ProyectoWilson.demo.Exceptions.Cliente.ClienteNoExiste;
import com.ProyectoWilson.demo.Exceptions.ClienteTratamiento.ClienteTratamientoNoExiste;
import com.ProyectoWilson.demo.Exceptions.Tratamiento.TratamientoNoExiste;
import com.ProyectoWilson.demo.Repository.ClienteRepository;
import com.ProyectoWilson.demo.Repository.ClienteTratamientoRepository;
import com.ProyectoWilson.demo.Repository.TratamientoRepository;
import com.ProyectoWilson.demo.Service.Interfaces.ClienteTratamientoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class ClienteTratamientoServiceImpl implements ClienteTratamientoService {
    @Autowired
    private ClienteRepository clienteRepository;

    @Autowired
    private TratamientoRepository tratamientoRepository;

    @Autowired
    private ClienteTratamientoRepository clienteTratamientoRepository;
    @Override
    public void asociarTratamiento(Long idCliente, Long idTratamiento, LocalDate fecha) {
        Cliente cliente = clienteRepository.findById(idCliente).orElseThrow(ClienteNoExiste::new);
        Tratamiento tratamiento = tratamientoRepository.findById(idTratamiento).orElseThrow(TratamientoNoExiste::new);
        ClienteTratamiento clienteTratamiento = new ClienteTratamiento();
        clienteTratamiento.setCliente(cliente);
        clienteTratamiento.setTratamiento(tratamiento);
        clienteTratamiento.setFecha(fecha);
        cliente.getTratamientos().add(clienteTratamiento);
        tratamiento.getClienteTratamientos().add(clienteTratamiento);
    }

    @Override
    public List<ClienteTratamiento> obtenerPorCliente(Long idCliente) {
        return clienteTratamientoRepository.findByClienteCedula(idCliente);
    }

    @Override
    public List<ClienteTratamiento> obtenerPorTratamiento(Long idTratamiento) {
        return clienteTratamientoRepository.findByTratamientoId(idTratamiento);
    }

    @Override
    public List<ClienteTratamiento> obtenerPorFecha(LocalDate fecha) {
        return clienteTratamientoRepository.findByFecha(fecha);
    }

    @Override
    public List<ClienteTratamiento> obtenerPorRangoDeFechas(LocalDate fechaInicio, LocalDate fechaFin) {
        return clienteTratamientoRepository.findByFechaBetween(fechaInicio,fechaFin);
    }

    @Override
    public List<ClienteTratamiento> obtenerPorClienteEnRangoFechas(Long idCliente,LocalDate fechaInicio,LocalDate fechaFin) {
        return clienteTratamientoRepository.findByClienteCedulaAndFechaBetween(idCliente, fechaInicio, fechaFin);
    }

    @Override
    public List<ClienteTratamiento> obtenerPorClienteConFechaDesc(Long idCliente) {
        return clienteTratamientoRepository.findByClienteCedulaOrderByFechaDesc(idCliente);
    }

    @Override
    public void eliminar(Long id) {
        ClienteTratamiento clienteTratamiento = clienteTratamientoRepository.findById(id).orElseThrow(()-> new ClienteTratamientoNoExiste());
        clienteTratamiento.getCliente().getTratamientos().remove(clienteTratamiento);
        clienteTratamiento.getTratamiento().getClienteTratamientos().remove(clienteTratamiento);
        clienteTratamientoRepository.delete(clienteTratamiento);
    }
}
