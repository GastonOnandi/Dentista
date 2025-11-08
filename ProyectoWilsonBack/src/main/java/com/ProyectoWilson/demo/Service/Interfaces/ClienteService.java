package com.ProyectoWilson.demo.Service.Interfaces;

import com.ProyectoWilson.demo.DTO.Request.ClienteRequestDTO;
import com.ProyectoWilson.demo.DTO.Response.ClienteResponseDTO;

public interface ClienteService {
    ClienteResponseDTO registrarCliente(ClienteRequestDTO dto);
    Void modificarCliente(Long id, ClienteRequestDTO dto);
    Void eliminarCliente(Long id);
}
