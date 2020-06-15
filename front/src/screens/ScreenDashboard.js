import React, {useState, useEffect} from 'react';
import '../App.css';
import { Row, Col, Button, Layout, List, Avatar } from 'antd';
import { Redirect, Link } from 'react-router-dom';
import 'antd/dist/antd.css';
import Nav from './Nav'
import FooterComp from './Footer';
import {connect} from 'react-redux'

const { Content } = Layout;


function ScreenDashboard(props) {

    const [infoUsername, setInfoUsername] = useState();
    const [infoLN, setInfoLN] = useState(); //Last Name
    const [infoFN, setInfoFN] = useState(); //First Name
    const [infoAddress, setInfoAddress] = useState(); 
    const [infoZip, setInfoZip] = useState();
    const [infoCity, setInfoCity] = useState();
    const [infoTel, setInfoTel] = useState();
    const [avatar, setAvatar] = useState();

    const [listOrder, setListOrder] = useState([]);
    const [listSale, setListSale] = useState([]);
    const [listCommandes, setListCommandes] = useState([])


    var user;

  useEffect(() => {
    async function loadUser() {

       //Récupération du token dans localStorage
        user = JSON.parse(localStorage.getItem('user', (err, value) => {    
      }))

      if(user){

        const rawResponse = await fetch(`/users/loadinfo/${user.token}`);
        const response = await rawResponse.json();

        console.log(response.user)

        if (response.user){ 

          setInfoUsername(response.user.username)
          setInfoLN(response.user.lastName);
          setInfoFN(response.user.firstName);
          setInfoAddress(response.user.address);
          setInfoZip(response.user.zip_code);
          setInfoCity(response.user.city);
          setInfoTel(response.user.tel);
          setAvatar(response.user.avatar);
          setListOrder(response.user.orders);
          setListSale(response.user.articles);
        }

      }
    
    }
    loadUser();
  }, [user]);

console.log(user)




console.log(listCommandes)

  let afficherNom = infoFN + ' ' + infoLN;
  if(!infoFN || !infoLN){
    afficherNom = infoUsername;
  }

  let finaliserCompte;
  if(!infoFN || !infoLN || !infoAddress || !infoCity || !infoZip || !infoTel || avatar === ''){
    finaliserCompte = <p>Vous pouvez finaliser votre compte en renseignant vos information <Link to='/profil'>ici</Link></p>
  }

  let listPendingSale =  [];

  listSale.map((article, i) =>{
    if(!article.sellout){
      let date = new Date(article.date_insert);
      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();

      article.date_insert = day + "/" + month + "/" + year;

      listPendingSale.push(article);
    }
  });

 
  return (
    <Layout className="layout" style={{height: 'auto', backgroundColor: 'white'}}>
      <Nav />

      <Content style={{ padding: '0 50px', margin: '40px 0' }} className="Dashboard-page">

      <Row justify='center' align='middle'>
        {finaliserCompte}
      </Row>
        
        <Row justify='center' align='middle'>
          <Col md={{span: 8}} sm={{span: 24}}>

            <h2 style={{fontWeight: 700, fontSize: 25}}>Bienvenue {afficherNom} !</h2>
    
          </Col>
          <Col align= 'center' md={{span: 8}} sm={{span: 12}} xs={{span: 24}}> 

          <h1 style={{fontWeight: 700, fontSize: 40}}>Tableau de bord</h1>

          </Col>

          <Col align= 'right' md={{span: 8}} sm={{span: 12}} xs={{span: 24}} style={{display: 'flex', flexDirection: 'column'}}>
            <Button style= {{width: 150, borderRadius: 5, boxShadow: '0px 3px 3px 0px black', marginTop: 20}} type="primary"><Link to='/mask'>Vendre des articles</Link></Button>
            <Button style= {{width: 150, borderRadius: 5, boxShadow: '0px 3px 3px 0px black', marginTop: 20}} type="primary"><Link to='/map'>Passer une commande</Link></Button>
            <Button style={{marginTop:20, width: 150, borderRadius: 5, boxShadow: '0px 3px 3px 0px black'}} type='primary'><Link to='/profil'>Modifier mes infos</Link></Button>
          </Col>

        </Row>

        <Row style={{marginTop: 40}}>
          <Col md={{span: 12}} sm={{span: 24}}>
            <h2>Commandes en attente de validation</h2>
            <div id="dashboard-box-pendingOrder" className="dashboard-box">

              <List
                locale={{emptyText : 'Aucune commande en attente.'}}
                itemLayout="horizontal"
                dataSource={listPendingSale}
                renderItem={item => (
                  <List.Item style={{margin: '2px 8px'}}>
                    <List.Item.Meta
                      avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                      title={"Article n° " + item._id}
                      description={"Créé le " + item.date_insert}
                    />
                    {item.description}
                  </List.Item>
                )}
              />,
  </div>
          </Col>
          <Col md={{span: 12}} sm={{span: 24}}>
            <h2>Historique des commandes</h2>
            <div id="dashboard-box-FinishOrder" className="dashboard-box">

              <List
                locale={{emptyText : "Vous n'avez pas encore passé de commande."}}
                itemLayout="horizontal"
                dataSource={listCommandes}
                renderItem={item => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                      title={"Commande n° " + item._id}
               
                    />
                  </List.Item>
                )}
              />,
  </div>
          </Col>
        </Row>

      </Content>
      <FooterComp/>
    </Layout>
  );
}

function mapStateToProps(state){
  return { 
    user: state.user
  }
}

export default connect(mapStateToProps, null)(ScreenDashboard);