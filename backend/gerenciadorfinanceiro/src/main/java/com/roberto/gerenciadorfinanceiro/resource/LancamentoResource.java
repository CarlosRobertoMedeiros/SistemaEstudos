package com.roberto.gerenciadorfinanceiro.resource;


import com.roberto.gerenciadorfinanceiro.dto.LancamentoEstatisticoCategoria;
import com.roberto.gerenciadorfinanceiro.dto.LancamentoEstatisticoPorDia;
import com.roberto.gerenciadorfinanceiro.event.RecursoCriadoEvent;
import com.roberto.gerenciadorfinanceiro.filter.LancamentoFilter;
import com.roberto.gerenciadorfinanceiro.model.LancamentoModel;
import com.roberto.gerenciadorfinanceiro.repository.LancamentoRepository;
import com.roberto.gerenciadorfinanceiro.repository.projection.ResumoLancamento;
import com.roberto.gerenciadorfinanceiro.service.LancamentoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping("api/lancamentos")
public class LancamentoResource {

    @Autowired
    private LancamentoRepository lancamentoRepository;

    @Autowired
    private LancamentoService lancamentoService;

    @Autowired
    private ApplicationEventPublisher publisher;

    @GetMapping("/relatorios/por-pessoa")
    @PreAuthorize("hasAuthority('ROLE_PESQUISAR_LANCAMENTO') and #oauth2.hasScope('read')")
    public ResponseEntity<byte[]> relatorioPorPessoa(
                @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate inicio,
                @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate fim) throws Exception {
        byte[] relatorio = lancamentoService.relatorioPorPessoa(inicio,fim);

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_PDF_VALUE)
                .body(relatorio);
    }

    @GetMapping("/estatisticas/por-dia")
    @PreAuthorize("hasAuthority('ROLE_PESQUISAR_LANCAMENTO') and #oauth2.hasScope('read')")
    public List<LancamentoEstatisticoPorDia> porDia(){
        return this.lancamentoRepository.porDia(LocalDate.now());
    }

    @GetMapping("/estatisticas/por-categoria")
    @PreAuthorize("hasAuthority('ROLE_PESQUISAR_LANCAMENTO') and #oauth2.hasScope('read')")
    public List<LancamentoEstatisticoCategoria> porCategoria(){
        return this.lancamentoRepository.porCategoria(LocalDate.now());
    }

    @GetMapping
    @PreAuthorize("hasAuthority('ROLE_PESQUISAR_LANCAMENTO') and #oauth2.hasScope('read')")
    public Page<LancamentoModel> pesquisar(LancamentoFilter lancamentoFilter, Pageable pageable) {
        return lancamentoRepository.filtrar(lancamentoFilter, pageable);
    }

    @GetMapping(params = "resumo")
    @PreAuthorize("hasAuthority('ROLE_PESQUISAR_LANCAMENTO') and #oauth2.hasScope('read')")
    public Page<ResumoLancamento> resumir(LancamentoFilter lancamentoFilter, Pageable pageable) {
        return lancamentoRepository.resumir(lancamentoFilter, pageable);
    }

    @GetMapping("{codigo}")
    @PreAuthorize("hasAuthority('ROLE_PESQUISAR_LANCAMENTO') and #oauth2.hasScope('read')")
    public ResponseEntity<?> listarPorCodigo(@PathVariable Long codigo) {
        Optional<LancamentoModel> lancamento = lancamentoRepository.findById(codigo);

        if (lancamento.isPresent())
            return ResponseEntity.ok(lancamento);

        return ResponseEntity.noContent().build();
    }

    @GetMapping("/descricao/{descricao}")
    public ResponseEntity<?> listarPorDescricao(@PathVariable String descricao) {
        List<LancamentoModel> lancamentos = lancamentoRepository.findByDescricaoIgnoreCaseContaining(descricao);

        if (!lancamentos.isEmpty())
            return ResponseEntity.ok(lancamentos);

        return ResponseEntity.noContent().build();

    }

    @DeleteMapping("{codigo}")
    @PreAuthorize("hasAuthority('RROLE_REMOVER_LANCAMENTO') and #oauth2.hasScope('write')")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void remover(@PathVariable Long codigo) {
        lancamentoRepository.deleteById(codigo);
    }

    @PostMapping
    @PreAuthorize("hasAuthority('ROLE_CADASTRAR_LANCAMENTO') and #oauth2.hasScope('write')")
    public ResponseEntity<LancamentoModel> criar(@RequestBody LancamentoModel lancamento, HttpServletResponse resp) {
        LancamentoModel lancamentoSalvo = lancamentoService.salvar(lancamento);

        publisher.publishEvent(new RecursoCriadoEvent(this, resp, lancamentoSalvo.getCodigo()));
        return ResponseEntity.status(HttpStatus.CREATED).body(lancamentoSalvo);
    }

    @PutMapping("/{codigo}")
    public ResponseEntity<LancamentoModel> atualizar(@RequestBody LancamentoModel lancamento,
                                                     @PathVariable long codigo) {

        LancamentoModel lancamentoModelSalvo = lancamentoService.atualizar(codigo, lancamento);

        if (lancamentoModelSalvo == null)
            return ResponseEntity.noContent().build();

        return ResponseEntity.ok().body(lancamentoModelSalvo);
    }
}
