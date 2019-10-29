package com.roberto.gerenciadorfinanceiro.resource;

import com.roberto.gerenciadorfinanceiro.filter.PessoaFilter;
import com.roberto.gerenciadorfinanceiro.model.PessoaModel;
import com.roberto.gerenciadorfinanceiro.repository.PessoaRepository;
import com.sun.xml.bind.v2.TODO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("api/pessoas")
public class PessoaResource {

    @Autowired
    private PessoaRepository pessoaRepository;

    //TODO: Reimplementar o ListarTodos retornando uma paginação, evitando as consultas baseadas em eager
    @GetMapping
    public ResponseEntity<List<PessoaModel>> ListarTodas(){
        List<PessoaModel> pessoas = pessoaRepository.findAll();
        if (pessoas.isEmpty()){
            return  ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok().body(pessoas);
    }

    @GetMapping(params = "listar")
    public Page<PessoaModel> ListarComFiltro(PessoaFilter pessoaFilter, Pageable pageable){
        return pessoaRepository.filtrar(pessoaFilter,pageable);

    }
    /*public Page<LancamentoModel> pesquisar(LancamentoFilter lancamentoFilter, Pageable pageable) {
        return lancamentoRepository.filtrar(lancamentoFilter,pageable);
    }*/




}
