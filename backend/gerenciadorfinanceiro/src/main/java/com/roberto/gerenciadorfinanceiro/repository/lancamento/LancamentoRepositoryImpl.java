package com.roberto.gerenciadorfinanceiro.repository.lancamento;

import com.roberto.gerenciadorfinanceiro.dto.LancamentoEstatisticoCategoria;
import com.roberto.gerenciadorfinanceiro.dto.LancamentoEstatisticoPessoa;
import com.roberto.gerenciadorfinanceiro.dto.LancamentoEstatisticoPorDia;
import com.roberto.gerenciadorfinanceiro.filter.LancamentoFilter;
import com.roberto.gerenciadorfinanceiro.model.LancamentoModel;
import com.roberto.gerenciadorfinanceiro.repository.projection.ResumoLancamento;
import org.apache.commons.lang3.StringUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;


public class LancamentoRepositoryImpl implements LancamentoRepositoryQuery {

    @PersistenceContext
    private EntityManager manager;

    @Override
    public List<LancamentoEstatisticoPorDia> porDia(LocalDate mesReferencia) {
        CriteriaBuilder criteriaBuilder = manager.getCriteriaBuilder();
        CriteriaQuery<LancamentoEstatisticoPorDia> criteriaQuery = criteriaBuilder.createQuery(LancamentoEstatisticoPorDia.class); //Devolve Dados
        Root<LancamentoModel> root = criteriaQuery.from(LancamentoModel.class);//Busca Dados

        criteriaQuery.select(criteriaBuilder.construct(
                LancamentoEstatisticoPorDia.class,
                root.get("tipo"),
                root.get("dataVencimento"),
                criteriaBuilder.sum(root.get("valor"))));

        LocalDate primeiroDiaDoMes = mesReferencia.withDayOfMonth(1);
        LocalDate ultimoDiaDoMes = mesReferencia.withDayOfMonth(mesReferencia.lengthOfMonth());

        criteriaQuery.where(
                criteriaBuilder.greaterThanOrEqualTo(root.get("dataVencimento"),primeiroDiaDoMes),
                criteriaBuilder.lessThanOrEqualTo(root.get("dataVencimento"),ultimoDiaDoMes));

        criteriaQuery.groupBy(root.get("tipo"),
                              root.get("dataVencimento"));

        TypedQuery<LancamentoEstatisticoPorDia> typedQuery = manager.createQuery(criteriaQuery);

        return typedQuery.getResultList();
    }

    @Override
    public List<LancamentoEstatisticoPessoa> porPessoa(LocalDate inicio, LocalDate fim) {
        CriteriaBuilder criteriaBuilder = manager.getCriteriaBuilder();
        CriteriaQuery<LancamentoEstatisticoPessoa> criteriaQuery = criteriaBuilder.createQuery(LancamentoEstatisticoPessoa.class); //Devolve Dados
        Root<LancamentoModel> root = criteriaQuery.from(LancamentoModel.class);//Busca Dados

        criteriaQuery.select(criteriaBuilder.construct(
                LancamentoEstatisticoPessoa.class,
                root.get("tipo"),
                root.get("pessoa"),
                criteriaBuilder.sum(root.get("valor"))));


        criteriaQuery.where(
                criteriaBuilder.greaterThanOrEqualTo(root.get("dataVencimento"),inicio),
                criteriaBuilder.lessThanOrEqualTo(root.get("dataVencimento"),fim));

        criteriaQuery.groupBy(root.get("tipo"),
                root.get("pessoa"));

        TypedQuery<LancamentoEstatisticoPessoa> typedQuery = manager.createQuery(criteriaQuery);

        return typedQuery.getResultList();

    }

    /**
     * Pesquisa por mês de Referência entre o primeiro e ultimo dia
     * Agrupado por categoria, usando criteria
     * @param mesReferencia
     * @return
     */
    @Override
    public List<LancamentoEstatisticoCategoria> porCategoria(LocalDate mesReferencia) {

        CriteriaBuilder criteriaBuilder = manager.getCriteriaBuilder();
        CriteriaQuery<LancamentoEstatisticoCategoria> criteriaQuery = criteriaBuilder.createQuery(LancamentoEstatisticoCategoria.class); //Devolve Dados
        Root<LancamentoModel> root = criteriaQuery.from(LancamentoModel.class);//Busca Dados

        criteriaQuery.select(criteriaBuilder.construct(
                LancamentoEstatisticoCategoria.class,
                root.get("categoria"),criteriaBuilder.sum(root.get("valor"))));

        LocalDate primeiroDiaDoMes = mesReferencia.withDayOfMonth(1);
        LocalDate ultimoDiaDoMes = mesReferencia.withDayOfMonth(mesReferencia.lengthOfMonth());

        criteriaQuery.where(
            criteriaBuilder.greaterThanOrEqualTo(root.get("dataVencimento"),primeiroDiaDoMes),
            criteriaBuilder.lessThanOrEqualTo(root.get("dataVencimento"),ultimoDiaDoMes));

        criteriaQuery.groupBy(root.get("categoria"));

        TypedQuery<LancamentoEstatisticoCategoria> typedQuery = manager.createQuery(criteriaQuery);
        return typedQuery.getResultList();
    }

    @Override
    public Page<LancamentoModel> filtrar(LancamentoFilter lancamentoFilter, Pageable pageable) {
        CriteriaBuilder builder = manager.getCriteriaBuilder();
        CriteriaQuery<LancamentoModel> criteria = builder.createQuery(LancamentoModel.class);
        Root<LancamentoModel> root = criteria.from(LancamentoModel.class);

        Predicate[] predicates = criarRestricoes(lancamentoFilter, builder, root);
        criteria.where(predicates);

        TypedQuery<LancamentoModel> query = manager.createQuery(criteria);
        adicionarRestricoesDePaginacao(query, pageable);

        return new PageImpl<>(query.getResultList(), pageable, total(lancamentoFilter));
    }

    @Override
    public Page<ResumoLancamento> resumir(LancamentoFilter lancamentoFilter, Pageable pageable) {
        CriteriaBuilder builder = manager.getCriteriaBuilder();
        CriteriaQuery<ResumoLancamento> criteria = builder.createQuery(ResumoLancamento.class);
        Root<LancamentoModel> root = criteria.from(LancamentoModel.class);
        criteria.select(builder.construct(ResumoLancamento.class
                , root.get("codigo")
                , root.get("descricao")
                , root.get("dataVencimento")
                , root.get("dataPagamento")
                , root.get("valor")
                , root.get("tipo")
                , root.get("categoria").get("nome")
                , root.get("pessoa").get("nome")
        ));

        Predicate[] predicates = criarRestricoes(lancamentoFilter, builder, root);
        criteria.where(predicates);

        TypedQuery<ResumoLancamento> query = manager.createQuery(criteria);
        adicionarRestricoesDePaginacao(query, pageable);

        return new PageImpl<>(query.getResultList(), pageable, total(lancamentoFilter));
    }

    private Predicate[] criarRestricoes(LancamentoFilter lancamentoFilter, CriteriaBuilder builder,
                                        Root<LancamentoModel> root) {

        List<Predicate> predicates = new ArrayList<>();

        if (!StringUtils.isEmpty(lancamentoFilter.getDescricao())) {
            predicates.add(builder.like(
                                        builder.lower(root.get("descricao")),
                                "%" + lancamentoFilter.getDescricao().toLowerCase() + "%"));
        }

        if (lancamentoFilter.getDataVencimentoDe() != null) {
            predicates.add(builder.greaterThanOrEqualTo(root.get("dataVencimento"),
                    lancamentoFilter.getDataVencimentoDe()));
        }

        if (lancamentoFilter.getDataVencimentoAte() != null) {
            predicates.add(builder.lessThanOrEqualTo(root.get("dataVencimento"),
                    lancamentoFilter.getDataVencimentoAte()));

        }

        return predicates.toArray(new Predicate[predicates.size()]);
    }

    private void adicionarRestricoesDePaginacao(TypedQuery<?> query, Pageable pageable) {
        int paginaAtual = pageable.getPageNumber();
        int totalRegistroPorPagina = pageable.getPageSize();
        int primeiroRegistroDaPagina = paginaAtual * totalRegistroPorPagina;

        query.setFirstResult(primeiroRegistroDaPagina);
        query.setMaxResults(totalRegistroPorPagina);
    }

    private Long total(LancamentoFilter lancamentoFilter) {

        CriteriaBuilder builder = manager.getCriteriaBuilder();
        CriteriaQuery<Long> criteria = builder.createQuery(Long.class);
        Root<LancamentoModel> root = criteria.from(LancamentoModel.class);

        Predicate[] predicates = criarRestricoes(lancamentoFilter, builder, root);
        criteria.where(predicates);
        criteria.select(builder.count(root));

        return manager.createQuery(criteria).getSingleResult();
    }
}
