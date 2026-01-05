package com.ProyectoWilson.demo.Service.Impl;

import com.ProyectoWilson.demo.Entities.Cliente;
import com.ProyectoWilson.demo.Entities.ClienteConsideracion;
import com.ProyectoWilson.demo.Entities.Enum.TipoConsideracion;
import com.ProyectoWilson.demo.Exceptions.Cliente.ClienteNoExiste;
import com.ProyectoWilson.demo.Exceptions.ClienteConsideracion.ClienteConsideracionNoExiste;
import com.ProyectoWilson.demo.Repository.ClienteConsideracionRepository;
import com.ProyectoWilson.demo.Repository.ClienteRepository;
import com.ProyectoWilson.demo.Service.Interfaces.ClienteConsideracionService;
import com.ProyectoWilson.demo.Service.Interfaces.Historico.HistoricoClienteConsideracionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ClienteConsideracionServiceImpl implements ClienteConsideracionService {

    @Autowired
    private ClienteConsideracionRepository clienteConsideracionRepository;

    @Autowired
    private ClienteRepository clienteRepository;

    @Autowired
    private HistoricoClienteConsideracionService hClienteConsideracionService;

    @Override
    public void agregarConsideracion(TipoConsideracion tipo, String detalle, Long idCliente) {
        Cliente cliente = clienteRepository.findById(idCliente).orElseThrow(ClienteNoExiste::new);
        ClienteConsideracion clienteConsideracion = new ClienteConsideracion();
        clienteConsideracion.setTipo(tipo);
        clienteConsideracion.setDetalle(detalle);
        clienteConsideracion.setCliente(cliente);
        clienteConsideracionRepository.save(clienteConsideracion);
        hClienteConsideracionService.registrarAgregar(clienteConsideracion);
        cliente.getConsideraciones().add(clienteConsideracion);
    }

    @Override
    public void editarConsideracion(TipoConsideracion tipo, String detalle, Long idConsideracion) {
        ClienteConsideracion clienteConsideracionVieja = clienteConsideracionRepository.findById(idConsideracion).orElseThrow(ClienteConsideracionNoExiste::new);
        ClienteConsideracion clienteConsideracion = clienteConsideracionRepository.findById(idConsideracion).orElseThrow(ClienteConsideracionNoExiste::new);
        clienteConsideracion.setTipo(tipo);
        clienteConsideracion.setDetalle(detalle);
        clienteConsideracionRepository.save(clienteConsideracion);
        hClienteConsideracionService.registrarModificacion(clienteConsideracionVieja,clienteConsideracion);
    }

    @Override
    public void eliminarConsideracion(Long idCliente, Long idConsideracion) {
        ClienteConsideracion clienteConsideracion = clienteConsideracionRepository.findById(idConsideracion).orElseThrow(ClienteConsideracionNoExiste::new);
        Cliente cliente = clienteConsideracion.getCliente();
        hClienteConsideracionService.registrarEliminar(clienteConsideracion);
        cliente.getConsideraciones().remove(clienteConsideracion);
    }
}
