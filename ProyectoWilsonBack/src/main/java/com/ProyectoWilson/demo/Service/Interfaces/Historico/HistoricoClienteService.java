package com.ProyectoWilson.demo.Service.Interfaces.Historico;

import com.ProyectoWilson.demo.DTO.Response.Historico.HistoricoClienteResponseDTO;
import com.ProyectoWilson.demo.Entities.Cliente;



import java.util.List;

public interface HistoricoClienteService {
    void registrarAgregar(Cliente nuevo);
    void registrarModificacion (Cliente anterior, Cliente nuevo);
    List<HistoricoClienteResponseDTO> listarHistoricosPorCliente(Long cedula);
}
