package com.roberto.gerenciadorfinanceiro.service;

import com.roberto.gerenciadorfinanceiro.dto.LancamentoEstatisticoPessoa;
import com.roberto.gerenciadorfinanceiro.model.LancamentoModel;
import com.roberto.gerenciadorfinanceiro.model.PessoaModel;
import com.roberto.gerenciadorfinanceiro.repository.LancamentoRepository;
import com.roberto.gerenciadorfinanceiro.repository.PessoaRepository;
import com.roberto.gerenciadorfinanceiro.service.exception.PessoaInexistenteOuInativaException;
import net.sf.jasperreports.engine.JasperExportManager;
import net.sf.jasperreports.engine.JasperFillManager;
import net.sf.jasperreports.engine.JasperPrint;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import javax.validation.Valid;
import java.io.InputStream;
import java.sql.Date;
import java.time.LocalDate;
import java.util.*;

@Service
public class LancamentoService {

    @Autowired
    PessoaRepository pessoaRepository;

    @Autowired
    LancamentoRepository lancamentoRepository;

    //@Scheduled(fixedDelay = 1000 * 2)
    @Scheduled(cron = "0 11 06 * * *")
    public void avisarSonreLancamentosVencidos(){
        System.out.println(">>>>>> Método Sendo Executado <<<<<<<<");
    }

    public byte[] relatorioPorPessoa(LocalDate inicio, LocalDate fim) throws Exception{
        List<LancamentoEstatisticoPessoa> dados = lancamentoRepository.porPessoa(inicio, fim);

        Map<String,Object> parametros = new HashMap<>();
        parametros.put("DT_INICIO", Date.valueOf(inicio));
        parametros.put("DT_FIM", Date.valueOf(fim));
        parametros.put("REPORT_LOCALE", new Locale("pt","BR"));

        InputStream inputStream = this.getClass().getResourceAsStream("/relatorios/lancamentos-por-pessoa.jasper");
        JasperPrint jasperPrint = JasperFillManager.fillReport(inputStream, parametros,new JRBeanCollectionDataSource(dados));

        return JasperExportManager.exportReportToPdf(jasperPrint);
    }


    public LancamentoModel salvar(@Valid LancamentoModel lancamentoModel) {
        PessoaModel pessoaModel = pessoaRepository.findById(lancamentoModel.getPessoa().getCodigo()).get();

        if(pessoaModel==null){
            throw new PessoaInexistenteOuInativaException();
        }

        return lancamentoRepository.save(lancamentoModel);
    }


    public LancamentoModel atualizar(long codigo, LancamentoModel lancamento) {
        Optional<LancamentoModel> lancamentoSalvo = buscarPeloCodigo(codigo);
        //TODO: Tem que Implementar a consulta de pessoa e categoria antes da atualização
        lancamento.setCodigo(lancamentoSalvo.get().getCodigo());
        return lancamentoRepository.save(lancamento);
    }

    public Optional<LancamentoModel> buscarPeloCodigo(long codigo) {
        Optional<LancamentoModel> lancamentoSalvo = lancamentoRepository.findById(codigo);

        if (lancamentoSalvo==null){
            throw new EmptyResultDataAccessException(1);
        }
        return lancamentoSalvo;
    }
}
