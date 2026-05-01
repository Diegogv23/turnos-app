package com.turnosapp.backend.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "servicios")
public class Servicio {

    @Id
    private String id;
    private String nombre;
    private String categoria;
    private String descripcion;
    private Double precio;
    private Integer duracionMinutos;
    private Boolean activo;
}