package com.ProyectoWilson.demo.Entities.Historico;

import com.ProyectoWilson.demo.Entities.Cliente;
import com.ProyectoWilson.demo.Entities.ClienteConsideracion;
import com.ProyectoWilson.demo.Entities.Enum.TipoConsideracion;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class HistoricoClienteConsideracion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "clienteConsideracion_id", nullable = false)
    private ClienteConsideracion clienteConsideracion;

    @Column(nullable = false)
    private LocalDate fechaModificacion;

    @Column(nullable = false)
    private String tipoModificacion;

    private TipoConsideracion tipoViejo;
    private String detalleViejo;

    private TipoConsideracion tipoNuevo;
    private String detalleNuevo;
}
