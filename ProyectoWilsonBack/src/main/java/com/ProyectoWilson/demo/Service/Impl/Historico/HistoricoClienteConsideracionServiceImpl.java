package com.ProyectoWilson.demo.Service.Impl.Historico;

import com.ProyectoWilson.demo.DTO.Response.Historico.HistoricoClienteConsideracionResponseDTO;
import com.ProyectoWilson.demo.DTO.Response.Historico.HistoricoTratamientoResponseDTO;
import com.ProyectoWilson.demo.Entities.ClienteConsideracion;
import com.ProyectoWilson.demo.Entities.Historico.HistoricoCliente;
import com.ProyectoWilson.demo.Entities.Historico.HistoricoClienteConsideracion;
import com.ProyectoWilson.demo.Entities.Tratamiento;
import com.ProyectoWilson.demo.Exceptions.ClienteConsideracion.ClienteConsideracionNoExiste;
import com.ProyectoWilson.demo.Exceptions.Historicos.HistoricoClienteConsideracion.HistoricoClienteConsideracionNoExiste;
import com.ProyectoWilson.demo.Mapper.Historico.HistoricoClienteConsideracionMapper;
import com.ProyectoWilson.demo.Repository.ClienteConsideracionRepository;
import com.ProyectoWilson.demo.Repository.Historico.HistoricoClienteConsideracionRepository;
import com.ProyectoWilson.demo.Service.Interfaces.Historico.HistoricoClienteConsideracionService;
import com.ProyectoWilson.demo.Service.Interfaces.Historico.HistoricoTratamientoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
public class HistoricoClienteConsideracionServiceImpl implements HistoricoClienteConsideracionService {

    @Autowired
    private HistoricoClienteConsideracionRepository historicoRepository;

    @Autowired
    private ClienteConsideracionRepository clienteConsideracionRepository;

    @Autowired
    private HistoricoClienteConsideracionMapper hMapper;

    @Override
    public void registrarAgregar(ClienteConsideracion nuevo) {
        HistoricoClienteConsideracion hNuevo = new HistoricoClienteConsideracion();
        hNuevo.setClienteConsideracion(nuevo);
        hNuevo.setFechaModificacion(LocalDate.now());
        hNuevo.setTipoModificacion("Agregar");
        hNuevo.setDetalleNuevo(nuevo.getDetalle());
        hNuevo.setTipoNuevo(nuevo.getTipo());
        historicoRepository.save(hNuevo);
    }

    @Override
    public void registrarModificacion(ClienteConsideracion anterior, ClienteConsideracion nuevo) {
        HistoricoClienteConsideracion hViejo = historicoRepository.findById(anterior.getId()).orElseThrow(HistoricoClienteConsideracionNoExiste::new);
        HistoricoClienteConsideracion hNuevo = new HistoricoClienteConsideracion();
        hNuevo.setClienteConsideracion(nuevo);
        hNuevo.setFechaModificacion(LocalDate.now());
        hNuevo.setTipoModificacion("Modificar");
        hNuevo.setDetalleNuevo(nuevo.getDetalle());
        hNuevo.setTipoNuevo(nuevo.getTipo());
        hNuevo.setDetalleViejo(hViejo.getDetalleNuevo());
        hNuevo.setTipoViejo(hViejo.getTipoNuevo());
        historicoRepository.save(hNuevo);

    }

    @Override
    public void registrarEliminar (ClienteConsideracion anterior){
        HistoricoClienteConsideracion hViejo = historicoRepository.findById(anterior.getId()).orElseThrow(HistoricoClienteConsideracionNoExiste::new);
        HistoricoClienteConsideracion hNuevo = new HistoricoClienteConsideracion();
        hNuevo.setClienteConsideracion(anterior);
        hNuevo.setFechaModificacion(LocalDate.now());
        hNuevo.setTipoModificacion("Eliminar");
        hNuevo.setDetalleViejo(hViejo.getDetalleNuevo());
        hNuevo.setTipoViejo(hViejo.getTipoNuevo());
        historicoRepository.save(hNuevo);
    }

    @Override
    public List<HistoricoClienteConsideracionResponseDTO> listarHistoricosPorClienteConsideracion(Long id) {
        ClienteConsideracion consideracion = clienteConsideracionRepository.findById(id)
                .orElseThrow(ClienteConsideracionNoExiste::new);

        List<HistoricoClienteConsideracion> historicos = historicoRepository.findByClienteConsideracionIdOrderByFechaModificacionDesc(id);

        List<HistoricoClienteConsideracionResponseDTO> resultado = new ArrayList<>();
        for (HistoricoClienteConsideracion historico : historicos) {
            HistoricoClienteConsideracionResponseDTO dto = hMapper.toResponseDTO(historico);
            resultado.add(dto);
        }

        return resultado;
    }

}
