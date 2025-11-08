package com.ProyectoWilson.demo.Service.Interfaces.Historico;

import com.ProyectoWilson.demo.DTO.Response.Historico.HistoricoClienteResponseDTO;
import com.ProyectoWilson.demo.Entities.Cliente;


import java.util.List;

public interface HistoricoClienteService {
    Void registrarAgregar(Cliente nuevo);
    Void registrarModificacion (Cliente anterior,Cliente nuevo);
    List<HistoricoClienteResponseDTO> listarHistoricosPorCliente(Long cedula);
}
