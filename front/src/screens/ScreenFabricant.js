import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import Nav from './Nav'
import FooterComp from './Footer';

import { Row, Col, Layout, Avatar, Card, Form, Select, Input, Button} from 'antd';
import { UserOutlined } from '@ant-design/icons';
const { Content, Footer } = Layout;

const { Option } = Select;


function ScreenFabricant (props){

const [articleId, setArticleId] = useState('')
const [article, setArticle] = useState();
const [color, setColor] = useState('noir');

useEffect(() => {
    var data = async() => {
    var rawResponse = await fetch(`/articleId/${props.match.params.id}`);
    var response = await rawResponse.json();
      setArticleId(response)
      console.log(response)
    }
    data()
  }, []);

  console.log(articleId)
  console.log(articleId.color)

   const onChangeColor = value => {
            setColor(value)
      };

    return(


    <Layout style={{height: 'auto', backgroundColor: 'white'}}className="layout">
        
        <Nav/>
    
        
    
            {/* ----------------CONTENU---------------- */}
        
            <Row style={{display: 'flex', justify: 'start', marginTop: 25}}>
            {/* Profil fabricant */}
            <Col offset={1} md={{span : 2}} sm={{span : 4}}>
                <Avatar size={64} icon={<UserOutlined />} />
            </Col>
            <Col md={{span : 10}} sm={{span : 16}}>
                <div style={{marginLeft: 20, color: '#1E272E'}}>
                    
                    <h3 style={{fontWeight: 700, fontSize: 25}}>Shawn Williamson</h3>
                    <p style={{width : 400}}>Dolor eu nostrud magna ut dolore ad non mollit occaecat. Adipisicing ullamco et tempor nostrud. Occaecat occaecat non magna consectetur quis adipisicing sunt culpa.</p>
                
                </div>
                </Col>
            </Row>
            {/* images +  choix masques */}
            <Row style={{marginTop: 30, display : 'flex', justify:'space-around'}}>
        

                <Col md={{span : 12}} sm={{span : 24}} style={{justify:'center'}}>
                    <Card style={{width: 'auto'}}
                        
                        cover={<img alt="example" src={`../assets/masques/masque-${color}.png`} />}
                    >
                    </Card>

                
                </Col>
                <Col md={{span : 12}} sm={{span : 24}}>
                    <Form style={{textAlign:'left'}}>
                        <Form.Item><p>{articleId.description}</p></Form.Item>
                        <Form.Item style={{width: 400}}name="Modèle" label="Modèle" rules={[{ required: true }]}>
                        <Select
                        
                            placeholder="Choisissez votre modèle"
                            allowClear
                        >
                            <Option value={articleId.modele}></Option>
                            <Option value="female">Modèle 2</Option>
                            <Option value="other">Modèle 3</Option>
                        </Select>
                        </Form.Item>

                        <Form.Item style={{width: 400}} name="Couleur" label="Couleur" rules={[{ required: true }]}>
                        <Select
                            onChange={onChangeColor}
                            placeholder="Choisissez votre couleur"
                            allowClear
                        >
                            <Option value="noir">noir</Option>
                            <Option value="rouge">rouge</Option>
                            <Option value="bleu">bleu</Option>
                            <Option value={articleId.color}></Option>
                        </Select>
                        </Form.Item>

                        <Form.Item style={{width: 400}} name="Qualité" label="Qualité" rules={[{ required: true }]}>
                        <Select
                            placeholder="Choisissez la qualité du masque"
                            allowClear
                        >
                            <Option value={articleId.quality}></Option>
                        </Select>
                        </Form.Item>

                        <Form.Item label="Personnalisation" name="Personnalisation"
                                    rules={[{ required: false}]}
                        >
                            <Input.TextArea placeholder= 'Entrez l’inscription souhaitée'/>
                        </Form.Item>

                        <Form.Item label="Quantité" name="Quantité"
                                    rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <Input placeholder= 'Entrez la quantité souhaitée'/>
                        </Form.Item>

                        <Form.Item label="Prix Unitaire" name="Prix">
                            <p>{articleId.price} € (c'est cher hein ?)</p>
                        </Form.Item>

                        <Link to= '/basket'><Button style={{backgroundColor : '#E23D70', width: 90, borderRadius: 5, boxShadow: '0px 3px 3px 0px black'}}>Valider</Button></Link>

                    </Form>

                </Col> 

            </Row>       
            <FooterComp/>
    </Layout>

    )

    
}

export default ScreenFabricant;