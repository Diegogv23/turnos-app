package com.turnosapp.backend.controller;

import com.turnosapp.backend.model.Turno;
import com.turnosapp.backend.service.TurnoService;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/turnos")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class TurnoController {

    private final TurnoService turnoService;

    @GetMapping
    public ResponseEntity<List<Turno>> obtenerTodos() {
        return ResponseEntity.ok(turnoService.obtenerTodos());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Turno> obtenerPorId(@PathVariable String id) {
        return turnoService.obtenerPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/cliente/{clienteId}")
    public ResponseEntity<List<Turno>> obtenerPorCliente(@PathVariable String clienteId) {
        return ResponseEntity.ok(turnoService.obtenerPorCliente(clienteId));
    }

    @GetMapping("/estado/{estado}")
    public ResponseEntity<List<Turno>> obtenerPorEstado(@PathVariable String estado) {
        return ResponseEntity.ok(turnoService.obtenerPorEstado(estado));
    }

    @GetMapping("/rango")
    public ResponseEntity<List<Turno>> obtenerPorRango(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime inicio,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime fin) {
        return ResponseEntity.ok(turnoService.obtenerPorRangoFecha(inicio, fin));
    }

    @PostMapping
    public ResponseEntity<Turno> crear(@RequestBody Turno turno) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(turnoService.crear(turno));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Turno> actualizar(
            @PathVariable String id,
            @RequestBody Turno turno) {
        return turnoService.actualizar(id, turno)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PatchMapping("/{id}/estado")
    public ResponseEntity<Turno> actualizarEstado(
            @PathVariable String id,
            @RequestParam String estado) {
        return turnoService.actualizarEstado(id, estado)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Turno> cancelar(@PathVariable String id) {
        return turnoService.cancelar(id)
                ? ResponseEntity.noContent().build()
                : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}/eliminar")
    public ResponseEntity<Void> eliminar(@PathVariable String id) {
        return turnoService.eliminar(id)
                ? ResponseEntity.noContent().build()
                : ResponseEntity.notFound().build();
    }
}
