package com.ProyectoWilson.demo.Service.Interfaces;

import com.ProyectoWilson.demo.DTO.Request.ClienteRequestDTO;
import com.ProyectoWilson.demo.DTO.Response.ClienteResponseDTO;
import com.ProyectoWilson.demo.DTO.Response.DeudaTratamientoDTO;

import java.time.LocalDate;
import java.util.List;

public interface ClienteService {
    ClienteResponseDTO registrarCliente(ClienteRequestDTO dto);
    void modificarCliente(Long id, ClienteRequestDTO dto);
    void agregarTratamientoRealizado (Long idCliente,Long idTratamiento, LocalDate fecha);
    List<ClienteResponseDTO> mostrarClientes();
    void pagarTratamiento(Long idCliente,Long idTratamiento ,Long monto);
    List<DeudaTratamientoDTO> obtenerDeudaTratamientos(Long idCliente);
    void agregarConsideracion(String tipo, String detalle, Long idCliente);
    void editarConsideracion(String tipo, String detalle, Long idConsideracion);
    void eliminarConsideracion(Long idCliente, Long idConsideracion);
}
