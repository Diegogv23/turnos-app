package com.turnosapp.backend.controller;

import com.turnosapp.backend.model.Servicio;
import com.turnosapp.backend.service.ServicioService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/servicios")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class ServicioController {

    private final ServicioService servicioService;

    @GetMapping
    public ResponseEntity<List<Servicio>> obtenerTodos() {
        return ResponseEntity.ok(servicioService.obtenerTodos());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Servicio> obtenerPorId(@PathVariable String id) {
        return servicioService.obtenerPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/activos")
    public ResponseEntity<List<Servicio>> obtenerActivos() {
        return ResponseEntity.ok(servicioService.obtenerActivos());
    }

    @GetMapping("/categoria/{categoria}")
    public ResponseEntity<List<Servicio>> obtenerPorCategoria(
            @PathVariable String categoria) {
        return ResponseEntity.ok(servicioService.obtenerPorCategoria(categoria));
    }

    @GetMapping("/buscar")
    public ResponseEntity<List<Servicio>> buscar(@RequestParam String nombre) {
        return ResponseEntity.ok(servicioService.buscar(nombre));
    }

    @PostMapping
    public ResponseEntity<Servicio> crear(@RequestBody Servicio servicio) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(servicioService.crear(servicio));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Servicio> actualizar(
            @PathVariable String id,
            @RequestBody Servicio servicio) {
        return servicioService.actualizar(id, servicio)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> desactivar(@PathVariable String id) {
        return servicioService.desactivar(id)
                ? ResponseEntity.noContent().build()
                : ResponseEntity.notFound().build();
    }
}