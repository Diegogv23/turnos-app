package com.turnosapp.backend.repository;

import com.turnosapp.backend.model.Turno;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface TurnoRepository extends MongoRepository<Turno, String> {

    List<Turno> findByClienteId(String clienteId);
    List<Turno> findByProfesionalId(String profesionalId);
    List<Turno> findByEstado(String estado);
    List<Turno> findByFechaHoraBetween(LocalDateTime inicio, LocalDateTime fin);
}