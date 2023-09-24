import React, { useEffect, useState } from "react";
import { Typography, Card, Modal, Badge } from "antd";
import axios from "axios";
import Recrutamento from '../assets/recrutamento.gif';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from '@fortawesome/free-regular-svg-icons'
import { faUpRightFromSquare } from '@fortawesome/free-solid-svg-icons'

const { Title, Text } = Typography;

const Cards = () => {
    const [vagas, setVagas] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [currentImageUrl, setCurrentImageUrl] = useState("");

    useEffect(() => {
        axios.get("https://strapi-production-5fc1.up.railway.app/api/vagas?sort=createdAt:DESC&populate=*")
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

    const formatDate = (date) => {
        const currentDate = new Date();
        const dateObject = new Date(date);
    
        // Remover horas, minutos e segundos para fazer uma comparação apenas da data
        currentDate.setHours(0, 0, 0, 0);
        dateObject.setHours(0, 0, 0, 0);
    
        // Calcular a diferença em dias
        const differenceInTime = currentDate - dateObject;
        const differenceInDays = differenceInTime / (1000 * 3600 * 24);
    
        // Formatar a data
        const day = dateObject.getDate();
        const month = dateObject.getMonth() + 1;
        const year = dateObject.getFullYear();
        const formattedDate = `${day}/${month < 10 ? '0'+month : month}/${year}`;
    
        // Se a diferença for de até 3 dias, retornar o componente com destaque
        if (differenceInDays <= 3) {
            return (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                <Badge count="Vaga Nova" color="green" style={{ marginRight: '8px' }} />
                <Text strong>{formattedDate}</Text>
            </div>
            );
        }
        
        // Para datas mais antigas, apenas um texto estilizado
        return <Text style={{ fontStyle: 'italic' }}>{formattedDate}</Text>;
    };
    
    
    
    


    return (
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <div style={{display: 'flex', alignItems: 'center', gap: '30px', margin: '20px 0'}}>
             <Title level={3}>Vagas</Title> <img width={50} src={Recrutamento} alt="" />             
            </div>
            
            <div style={{display: 'flex', justifyContent: 'center', gap: '30px', flexWrap: 'wrap', width: '80%', margin: '0 auto'}}>
                {vagas.map((vaga) => (
                    <Card
                        extra={<div>{formatDate(vaga.attributes.publishedAt)}</div>}                    
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
                            description={`${vaga.attributes.email}`}
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
