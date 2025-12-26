package com.ProyectoWilson.demo.Service.Impl;

import com.ProyectoWilson.demo.DTO.Response.DeudaTratamientoDTO;
import com.ProyectoWilson.demo.Entities.Cliente;
import com.ProyectoWilson.demo.Entities.ClienteTratamiento;
import com.ProyectoWilson.demo.Entities.Tratamiento;
import com.ProyectoWilson.demo.Exceptions.Cliente.ClienteNoExiste;
import com.ProyectoWilson.demo.Exceptions.ClienteTratamiento.ClienteTratamientoNoExiste;
import com.ProyectoWilson.demo.Exceptions.ClienteTratamiento.MontoMayorQueDeudaException;
import com.ProyectoWilson.demo.Exceptions.Tratamiento.TratamientoNoExiste;
import com.ProyectoWilson.demo.Repository.ClienteRepository;
import com.ProyectoWilson.demo.Repository.ClienteTratamientoRepository;
import com.ProyectoWilson.demo.Repository.TratamientoRepository;
import com.ProyectoWilson.demo.Service.Interfaces.ClienteTratamientoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
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
        clienteTratamiento.setPago(0L);
        clienteTratamiento.setDebe(tratamiento.getCosto());
        clienteTratamientoRepository.save(clienteTratamiento);
        cliente.getTratamientos().add(clienteTratamiento);
        cliente.setDeuda(cliente.getDeuda() + clienteTratamiento.getDebe());
        tratamiento.getClienteTratamientos().add(clienteTratamiento);
    }

    @Override
    public void pagarDeuda(Long idCliente, Long idTratamiento, Long monto){
        Cliente cliente = clienteRepository.findById(idCliente).orElseThrow(ClienteNoExiste::new);
        Tratamiento tratamiento = tratamientoRepository.findById(idTratamiento).orElseThrow(TratamientoNoExiste::new);
        ClienteTratamiento clienteTratamiento = clienteTratamientoRepository.findByClienteCedulaAndTratamientoId(idCliente,idTratamiento).orElseThrow(ClienteTratamientoNoExiste::new);
        if (clienteTratamiento.getDebe()>= monto){
            clienteTratamiento.setPago(clienteTratamiento.getPago() + monto );
            clienteTratamiento.setDebe(clienteTratamiento.getDebe() - monto);
            cliente.setDeuda(cliente.getDeuda() - monto);
            clienteTratamientoRepository.save(clienteTratamiento);
        }
        else {
            throw new MontoMayorQueDeudaException();
        }

    }



    @Override
    public List<DeudaTratamientoDTO> obtenerDeudasPorCliente(Long idCliente) {
        List<ClienteTratamiento> clienteTratamientos = clienteTratamientoRepository.findByClienteCedula(idCliente);
        List<DeudaTratamientoDTO> deudaTratamientoDTOS = new ArrayList<>();

        for (ClienteTratamiento ct: clienteTratamientos){
            Long pago = ct.getPago();
            Long total = ct.getTratamiento().getCosto();
            Long deuda = total - pago;

            if (deuda > 0){
                DeudaTratamientoDTO dto = new DeudaTratamientoDTO(
                        ct.getCliente().getNombre(),
                        ct.getTratamiento().getNombre(),
                        ct.getFecha(),
                        pago,
                        deuda,
                        total);
                deudaTratamientoDTOS.add(dto);
            }

        }
        return deudaTratamientoDTOS;
    }

    @Override
    public List<DeudaTratamientoDTO> obtenerTodasLasDeudas() {
        List<ClienteTratamiento> clienteTratamientos = clienteTratamientoRepository.findAllWithClienteAndTratamiento();
        List<DeudaTratamientoDTO> deudaTratamientoDTOS = new ArrayList<>();
        for (ClienteTratamiento ct: clienteTratamientos) {
            Long pago = ct.getPago();
            Long total = ct.getTratamiento().getCosto();
            Long deuda = total - pago;
            DeudaTratamientoDTO dto = new DeudaTratamientoDTO(
                    ct.getCliente().getNombre(),
                    ct.getTratamiento().getNombre(),
                    ct.getFecha(),
                    pago,
                    deuda,
                    total
            );
            deudaTratamientoDTOS.add(dto);

        }
        return deudaTratamientoDTOS;
    }

    @Override
    public List<DeudaTratamientoDTO> obtenerDeudasPendientes() {
        List<ClienteTratamiento> clienteTratamientos = clienteTratamientoRepository.findAllWithClienteAndTratamiento();
        List<DeudaTratamientoDTO> deudaTratamientoDTOS = new ArrayList<>();
        for (ClienteTratamiento ct: clienteTratamientos) {
            Long pago = ct.getPago();
            Long total = ct.getTratamiento().getCosto();
            Long deuda = total - pago;
            if (deuda > 0) {
                DeudaTratamientoDTO dto = new DeudaTratamientoDTO(
                        ct.getCliente().getNombre(),
                        ct.getTratamiento().getNombre(),
                        ct.getFecha(),
                        pago,
                        deuda,
                        total
                );
            deudaTratamientoDTOS.add(dto);
        }
        }
        return deudaTratamientoDTOS;
    }

    @Override
    public List<DeudaTratamientoDTO> obtenerDeudasPorEstado(String estado) {
        List<ClienteTratamiento> clienteTratamientos = clienteTratamientoRepository.findAllWithClienteAndTratamiento();
        List<DeudaTratamientoDTO> deudaTratamientoDTOS = new ArrayList<>();
        for (ClienteTratamiento ct: clienteTratamientos) {
            Long pago = ct.getPago();
            Long total = ct.getTratamiento().getCosto();
            Long deuda = total - pago;
            if (ct.getEstado() == estado) {
                DeudaTratamientoDTO dto = new DeudaTratamientoDTO(
                        ct.getCliente().getNombre(),
                        ct.getTratamiento().getNombre(),
                        ct.getFecha(),
                        pago,
                        deuda,
                        total
                );
                deudaTratamientoDTOS.add(dto);
            }
        }
        return deudaTratamientoDTOS;
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
