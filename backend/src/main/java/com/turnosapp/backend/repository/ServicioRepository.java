package com.turnosapp.backend.repository;

import com.turnosapp.backend.model.Servicio;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ServicioRepository extends MongoRepository<Servicio, String> {

    List<Servicio> findByActivo(Boolean activo);
    List<Servicio> findByCategoria(String categoria);
    List<Servicio> findByNombreContainingIgnoreCase(String nombre);
}