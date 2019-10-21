package com.roberto.gerenciadorfinanceiro.resource;


import com.roberto.gerenciadorfinanceiro.event.RecursoCriadoEvent;
import com.roberto.gerenciadorfinanceiro.filter.LancamentoFilter;
import com.roberto.gerenciadorfinanceiro.model.LancamentoModel;
import com.roberto.gerenciadorfinanceiro.repository.LancamentoRepository;
import com.roberto.gerenciadorfinanceiro.repository.projection.ResumoLancamento;
import com.roberto.gerenciadorfinanceiro.service.LancamentoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import javax.servlet.http.HttpServletResponse;
import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;


@RestController
@RequestMapping("api/lancamentos")
public class LancamentoResource {

    @Autowired
    private LancamentoRepository lancamentoRepository;

    @Autowired
    private LancamentoService lancamentoService;

    @Autowired
    private ApplicationEventPublisher publisher;

    @GetMapping
    public Page<LancamentoModel> pesquisar(LancamentoFilter lancamentoFilter, Pageable pageable) {
        return lancamentoRepository.filtrar(lancamentoFilter,pageable);
    }

    @GetMapping(params="resumo")
    public Page<ResumoLancamento> resumir(LancamentoFilter lancamentoFilter, Pageable pageable) {
        return lancamentoRepository.resumir(lancamentoFilter,pageable);
    }

    @GetMapping("{codigo}")
    public ResponseEntity<?> listarPorCodigo(@PathVariable Long codigo) {
        Optional<LancamentoModel> lancamento = lancamentoRepository.findById(codigo);

        if (lancamento.isPresent())
            return ResponseEntity.ok(lancamento);

        return ResponseEntity.noContent().build();
    }

    @GetMapping("/descricao/{descricao}")
    public ResponseEntity<?> listarPorDescricao(@PathVariable String descricao){
        List<LancamentoModel> lancamentos = lancamentoRepository.findByDescricaoIgnoreCaseContaining(descricao);

        if (!lancamentos.isEmpty())
            return ResponseEntity.ok(lancamentos);

        return  ResponseEntity.noContent().build();

    }

    @DeleteMapping("{codigo}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void remover(@PathVariable Long codigo){
        lancamentoRepository.deleteById(codigo);
    }

    @PostMapping
    public ResponseEntity<LancamentoModel> criar(@RequestBody LancamentoModel lancamento, HttpServletResponse resp){
        LancamentoModel lancamentoSalvo = lancamentoService.salvar(lancamento);

        publisher.publishEvent(new RecursoCriadoEvent(this, resp, lancamentoSalvo.getCodigo()));
        return ResponseEntity.status(HttpStatus.CREATED).body(lancamentoSalvo);
    }


}
