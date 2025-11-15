package com.ProyectoWilson.demo.Service.Impl.Historico;

import com.ProyectoWilson.demo.DTO.Response.Historico.HistoricoClienteResponseDTO;
import com.ProyectoWilson.demo.Entities.Cliente;
import com.ProyectoWilson.demo.Entities.Historico.HistoricoCliente;
import com.ProyectoWilson.demo.Mapper.Historico.HistoricoClienteMapper;
import com.ProyectoWilson.demo.Repository.Historico.HistoricoClienteRepository;
import com.ProyectoWilson.demo.Service.Interfaces.Historico.HistoricoClienteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
public class HistoricoClienteServiceImpl implements HistoricoClienteService {

    @Autowired
    private HistoricoClienteRepository historicoClienteRepository;

    @Autowired
    private HistoricoClienteMapper historicoClienteMapper;

    @Override
    public void registrarAgregar(Cliente nuevo) {
        HistoricoCliente hCliente = new HistoricoCliente();
        hCliente.setCliente(nuevo);
        hCliente.setFechaModificacion(LocalDate.now());
        hCliente.setTipoModificacion("Registrar");
        hCliente.setDireccionNueva(nuevo.getDireccion());
        hCliente.setNombreNuevo(nuevo.getNombre());
        hCliente.setTelefonoNuevo(nuevo.getTelefono());
    }

    @Override
    public void registrarModificacion(Cliente anterior, Cliente nuevo) {
        HistoricoCliente hCliente = new HistoricoCliente();
        hCliente.setCliente(nuevo);
        hCliente.setFechaModificacion(LocalDate.now());
        hCliente.setTipoModificacion("Modificar");
        hCliente.setDireccionNueva(nuevo.getDireccion());
        hCliente.setNombreNuevo(nuevo.getNombre());
        hCliente.setTelefonoNuevo(nuevo.getTelefono());
        hCliente.setNombreViejo(anterior.getNombre());
        hCliente.setDireccionVieja(anterior.getDireccion());
        hCliente.setTelefonoViejo(anterior.getTelefono());
    }

    @Override
    public List<HistoricoClienteResponseDTO> listarHistoricosPorCliente(Long cedula) {
        List<HistoricoCliente> historicos = historicoClienteRepository.findByClienteCedulaOrderByFechaModificacionDesc(cedula);
        List<HistoricoClienteResponseDTO> retornar = new ArrayList<>();

        for (HistoricoCliente historico : historicos){
            retornar.add(historicoClienteMapper.toResponseDTO(historico));
        }
        return retornar;
    }
}
