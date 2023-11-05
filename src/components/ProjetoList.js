import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';
import '../App.css'
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'; // Importe o CSS se necessário


class ProjetoList extends Component {

    constructor(props) {
        super(props);
        this.state = {projetos: []};
    }

    componentDidMount() {
        fetch('/projeto')
            .then(response => response.json())
            .then(data => this.setState({projetos: data}));
    }

    async remove(projeto) {
        if(projeto.status==="Iniciado" || projeto.status==="Em Andamento" || projeto.status==="Encerrado"){
            alert("Projeto não pode ser encerrado devido ao projeto com status: " + projeto.status)
        }else{
    
        await fetch(`/projeto/${projeto.id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(() => {
            let updatedProjetos = [...this.state.projetos].filter(i => i.id !== projeto.id);
            this.setState({projetos: updatedProjetos});
        });
                
    }
    }

    render() {
        const {projetos} = this.state;


        
        const projetoList = projetos.map(projeto => {
            const dataInicio = new Date(projeto.dataInicio).toLocaleDateString('pt-BR');
            const dataPrevisaoFim = new Date(projeto.dataInicio).toLocaleDateString('pt-BR');
            const orcamento = projeto.orcamento.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
            return <tr key={projeto.id}>
                <td>{projeto.nome}</td>
                <td>{projeto.descricao}</td>
                <td>{dataInicio}</td> {/* Exibe a data formatada */}
                <td>{dataPrevisaoFim}</td>
                <td>{projeto.status}</td>
                <td>{orcamento}</td>
                <td>{projeto.risco}</td>
                

                <td>
                    <ButtonGroup>
                        <Button  color="primary" tag={Link} to={"/projeto/" + projeto.id}>Editar</Button>
                        <Button  color="danger" onClick={() => this.remove(projeto)}>Apagar</Button>
                    </ButtonGroup>
                </td>
            </tr>
        });

        return (
            <div>
                <AppNavbar/>
                <Container>
                    <div className="float-right">
                        <Button color="success" tag={Link} to="/projeto/new" >Adicionar Projeto</Button>
                    </div>
                    <h3>Projetos</h3>
                    <Table className="mt-4">
                        <thead>
                        <tr>
                            <th width="30%">Nome</th>
                            <th width="30%">Descrição</th>
                            <th width="30%">Data Inicio</th>
                            <th width="30%">Data Previsão Fim</th>
                            <th width="30%">Status</th>
                            <th width="30%">Orçamento</th>
                            <th width="30%">Risco</th>
                            <th width="40%">Ações</th>
                        </tr>
                        </thead>
                        <tbody>
                        {projetoList}
                        </tbody>
                    </Table>
                </Container>
            </div>
        );
    }
}

export default ProjetoList;