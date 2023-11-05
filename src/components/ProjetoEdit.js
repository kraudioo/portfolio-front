import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import AppNavbar from './AppNavbar';
import '../App.css'
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'; // Importe o CSS se necessário


class ProjetoEdit extends Component {

    emptyItem = {
        nome: '',
        descricao: ''
    };

    

    constructor(props) {
        super(props);
        this.state = {
            item: this.emptyItem,
            gerentes: [], // Array de gerentes
            
        };
        
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async componentDidMount() {
        
        const response = await (await fetch(`/pessoa`));
        const data = await response.json();
        this.setState({ gerentes: data });
        if (this.props.match.params.id !== 'new') {
            const projeto = await (await fetch(`/projeto/${this.props.match.params.id}`)).json();
            this.setState({item: projeto});

            

        }
    }

    

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let item = {...this.state.item};
        item[name] = value;
        this.setState({item});
    }

    async handleSubmit(event) {
        event.preventDefault();
        const {item} = this.state;

        await fetch('/projeto' + (item.id ? '/' + item.id : ''), {
            method: (item.id) ? 'PUT' : 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item),
        });
        this.props.history.push('/');
    }

    render() {
        const {item} = this.state;
        const title = <h2>{item.id ? 'Editar Projeto' : 'Adicionar Projeto'}</h2>;

        return <div>
            <AppNavbar/>
            <Container>
                {title}
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label for="nome">Nome</Label>
                        <Input type="text" name="nome" id="nome" value={item.nome || ''}
                               onChange={this.handleChange} autoComplete="nome"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="descricao">Descrição</Label>
                        <Input type="text" name="descricao" id="descricao" value={item.descricao || ''}
                               onChange={this.handleChange} autoComplete="descricao"/>
                    </FormGroup>
                    
                    <FormGroup >
                        <Label for="dataInicio">Data Início</Label>
                        <Input type="date" name="dataInicio" id="dataInicio" value={item.dataInicio || ''}
                               onChange={this.handleChange} autoComplete="dataInicio"/>

                        <Label for="dataPrevisaoFim">Data Previsão Fim</Label>
                        <Input type="date" name="dataPrevisaoFim" id="dataPrevisaoFim" value={item.dataPrevisaoFim || ''}
                               onChange={this.handleChange} autoComplete="dataPrevisaoFim"/>     
                    </FormGroup>
                    <FormGroup>
  <Label for="status">Status</Label>
  <Input type="select" name="status" id="status" value={item.status || ''} onChange={this.handleChange} autoComplete="status">
    <option value="">Selecione um Status</option>
    <option value="Em Análise">Em Análise</option>
    <option value="Análise Realizada">Análise Realizada</option>
    <option value="Análise Aprovada">Análise Aprovada</option>
    <option value="Iniciado">Iniciado</option>
    <option value="Planejado">Planejado</option>
    <option value="Em Andamento">Em Andamento</option>
    <option value="Encerrado">Encerrado</option>
    <option value="Cancelado">Cancelado</option>
  </Input>
</FormGroup>
                    <FormGroup>
                        <Label for="orcamento">Orçamento</Label>
                        <Input type="text" name="orcamento" id="orcamento" value={item.orcamento || ''}
                               onChange={this.handleChange} autoComplete="orcamento"/>
                    </FormGroup>
                    <FormGroup>
  <Label for="risco">Risco</Label>
  <Input
    type="select"
    name="risco"
    id="risco"
    value={item.risco || ''}
    onChange={this.handleChange}
    autoComplete="risco"
  >
    <option value="">Selecione um Risco</option>
    <option value="Baixo">Baixo</option>
    <option value="Médio">Médio</option>
    <option value="Alto">Alto</option>
  </Input>
</FormGroup>
                  

                    <FormGroup>
                    <Label for="idgerente">Gerente*</Label>
                     <Input type="select" name="idgerente" id="idgerente" value={item.idgerente || ''} onChange={this.handleChange} autoComplete="idgerente">
                    <option value="">Selecione um Gerente</option>
                    {this.state.gerentes.map((gerente) => (
                    <option key={gerente.id} value={gerente.id}>
                        {gerente.nome}
                    </option>
                    ))}
                </Input>
</FormGroup>

                    <FormGroup>
                        <Button  color="primary" type="submit">Salvar</Button>{' '}
                        <Button color="secondary" tag={Link} to="/">Cancelar</Button>
                    </FormGroup>
                </Form>
            </Container>
        </div>
    }
}

export default withRouter(ProjetoEdit);