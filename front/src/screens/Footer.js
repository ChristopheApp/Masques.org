import React from 'react';
import { Link } from 'react-router-dom';

import '../App.css';

import {Row, Col, Layout} from 'antd';
import {FacebookFilled, InstagramFilled} from '@ant-design/icons';
import 'antd/dist/antd.css';

const { Footer } = Layout;

function FooterComp() {
  return (
    
    <Footer style={{background: '#1e272e', color: 'white', textAlign: 'center'}}>
        

          <Row justify='center' align='middle'>
            <Col span={6}>
                <Link to='#'><p style={{color: 'white'}}>A propos</p></Link>
            </Col>
            <Col span={6}>
                <Link to='#'><p style={{color: 'white'}}>Contact</p></Link>
            </Col>
            <Col span={6}>
                <Link to='#'><p style={{color: 'white'}}>Actualité</p></Link>
            </Col>
      
            <Col span={6} style={{color : 'red'}}>
                <Link to='#' style={{color: 'white'}}><FacebookFilled style={{fontSize: 25, marginRight: 3}}/></Link>
                <Link to='#' style={{color: 'white'}}><InstagramFilled style={{fontSize: 25}}/></Link>
            </Col>
          </Row>
        
        <Row style={{fontSize: 12, marginTop: 40, color : '#9fa1a5'}} justify='center'>
        © 2020 Masques.org. Tous droits réservés.
        </Row>
     
    </Footer>

  );
}

export default FooterComp;