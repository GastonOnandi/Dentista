package com.ProyectoWilson.demo.Service.Interfaces.Historico;

import com.ProyectoWilson.demo.DTO.Response.Historico.HistoricoClienteConsideracionResponseDTO;
import com.ProyectoWilson.demo.DTO.Response.Historico.HistoricoClienteResponseDTO;
import com.ProyectoWilson.demo.Entities.Cliente;
import com.ProyectoWilson.demo.Entities.ClienteConsideracion;
import com.ProyectoWilson.demo.Entities.Historico.HistoricoClienteConsideracion;

import java.util.List;

public interface HistoricoClienteConsideracionService {
    void registrarAgregar(ClienteConsideracion nuevo);
    void registrarModificacion (ClienteConsideracion anterior, ClienteConsideracion nuevo);
    void registrarEliminar (ClienteConsideracion anterior);
    List<HistoricoClienteConsideracionResponseDTO> listarHistoricosPorClienteConsideracion(Long id);
}
