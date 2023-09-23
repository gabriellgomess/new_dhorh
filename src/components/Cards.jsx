import React, { useEffect, useState } from "react";
import { Typography, Card, Modal } from "antd";
import axios from "axios";
import Recrutamento from '../assets/recrutamento.gif';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from '@fortawesome/free-regular-svg-icons'
import { faUpRightFromSquare } from '@fortawesome/free-solid-svg-icons'

const { Title } = Typography;

const Cards = () => {
    const [vagas, setVagas] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [currentImageUrl, setCurrentImageUrl] = useState("");

    useEffect(() => {
        axios.get("https://strapi-production-5fc1.up.railway.app/api/vagas?populate=*")
        .then((response) => {
            setVagas(response.data.data);
        })
        .catch((error) => {
            console.log(error);
        });
    }, []);

    const showModal = (imageUrl) => {
        setCurrentImageUrl(imageUrl);
        setIsModalVisible(true);
    };

    const closeModal = () => {
        setIsModalVisible(false);
    };

    const modalWidth = window.innerWidth < 768 ? '90%' : '600px';

    const shareImage = (imageUrl) => {
        if (navigator.share) {
            navigator.share({
                title: 'Vaga Image',
                text: 'Confira esta vaga!',
                url: imageUrl,
            }).catch((error) => console.log('Erro ao compartilhar:', error));
        } else {
            alert('Seu navegador não suporta a API de compartilhamento.');
        }
    };


    return (
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <div style={{display: 'flex', alignItems: 'center', gap: '30px', margin: '20px 0'}}>
             <Title level={3}>Vagas</Title> <img width={50} src={Recrutamento} alt="" />             
            </div>
            
            <div style={{display: 'flex', justifyContent: 'center', gap: '30px', flexWrap: 'wrap', width: '80%', margin: '0 auto'}}>
                {vagas.map((vaga) => (
                    <Card 
                        key={vaga.id}
                        style={{ marginBottom: 20, width: 330 }} 
                        cover={
                            <img
                                style={{ cursor: "pointer" }}
                                alt={vaga.attributes.titulo} 
                                src={`https://strapi-production-5fc1.up.railway.app${vaga.attributes.imagem.data.attributes.formats.small.url}`} 
                                onClick={() => showModal(`https://strapi-production-5fc1.up.railway.app${vaga.attributes.imagem.data.attributes.formats.small.url}`)}
                            />
                        }                        
                        actions={[
                            <a href={`mailto:${vaga.attributes.email}?subject=${vaga.attributes.titulo}`} target="_blank" rel="noreferrer">
                                <FontAwesomeIcon icon={faEnvelope} />
                            </a>,
                            <FontAwesomeIcon icon={faUpRightFromSquare} onClick={() => shareImage(`https://strapi-production-5fc1.up.railway.app${vaga.attributes.imagem.data.attributes.formats.small.url}`)} />
                        ]}
                    >
                        <Card.Meta 
                            title={vaga.attributes.titulo} 
                            description={vaga.attributes.email}
                        />
                    </Card>
                ))}
            </div>
            <Modal 
                open={isModalVisible}
                onCancel={closeModal} 
                footer={null}
                width={modalWidth}
            >
                <img src={currentImageUrl} alt="Vaga Image" style={{ width: "100%" }} />
            </Modal>

        </div>
    );
}

export default Cards;
