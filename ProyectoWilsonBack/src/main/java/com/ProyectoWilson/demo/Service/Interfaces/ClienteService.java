package com.ProyectoWilson.demo.Service.Interfaces;

import com.ProyectoWilson.demo.DTO.Request.ClienteRequestDTO;
import com.ProyectoWilson.demo.DTO.Response.ClienteResponseDTO;

import java.time.LocalDate;
import java.util.List;

public interface ClienteService {
    ClienteResponseDTO registrarCliente(ClienteRequestDTO dto);
    void modificarCliente(Long id, ClienteRequestDTO dto);
    void agregarTratamientoRealizado (Long idCliente,Long idTratamiento, LocalDate fecha);
    List<ClienteResponseDTO> mostrarClientes();
}
