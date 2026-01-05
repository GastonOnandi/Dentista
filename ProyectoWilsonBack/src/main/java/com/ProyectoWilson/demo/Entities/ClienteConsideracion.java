package com.ProyectoWilson.demo.Entities;

import com.ProyectoWilson.demo.Entities.Enum.TipoConsideracion;
import com.ProyectoWilson.demo.Entities.Historico.HistoricoCliente;
import com.ProyectoWilson.demo.Entities.Historico.HistoricoClienteConsideracion;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ClienteConsideracion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private TipoConsideracion tipo; // "ALERGIA", "MEDICAMENTO"
    private String detalle;

    @ManyToOne(optional = false)
    @JoinColumn(name = "id_cliente")
    private Cliente cliente;

    @OneToMany(mappedBy = "clienteConsideracion", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<HistoricoClienteConsideracion> historico = new ArrayList<>();
}
