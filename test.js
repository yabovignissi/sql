const faker = require('faker');
const mysql = require('mysql2/promise');

async function insertMonsterQueteData() {
    // Nombre de fausses données à insérer
    const numberOfEntries = 10;

    // Se connecter à la base de données
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'votre_mot_de_passe',
        database: 'monstermon'
    });

    // Insertion des données fictives dans la table Monster_quete
    try {
        for (let i = 0; i < numberOfEntries; i++) {
            // Génération d'ID de Monster et de Quete aléatoires
            const monsterId = faker.datatype.number({ min: 1, max: 100 }); // Supposons que les ID des monsters vont de 1 à 100
            const queteId = faker.datatype.number({ min: 1, max: 50 }); // Supposons que les ID des quêtes vont de 1 à 50
            
            // Insertion des données dans la table Monster_quete
            await connection.query('INSERT INTO Monster_quete (Monster_ID, quete_id) VALUES (?, ?)', [monsterId, queteId]);
        }
        console.log('Données de test insérées dans la table Monster_quete.');
    } catch (error) {
        console.error('Une erreur est survenue lors de l\'insertion des données :', error);
    } finally {
        // Fermer la connexion à la base de données
        await connection.end();
    }
}

// Appel de la fonction pour insérer les données fictives
insertMonsterQueteData();


// Appel de la fonction pour insérer les données dans la table Quete
insertQueteData();
