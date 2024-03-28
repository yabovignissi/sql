const mysql = require('mysql2');


const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'rootroot',
    database: 'monstermon'
});


connection.connect((err) => {
    if (err) {
        console.error('Erreur de connexion à la base de données : ', err);
        throw err;
    }
    console.log('Connecté à la base de données monstermon.');

    //MonstersCaptures();
    // NumberTypeofMonster();
    especesMonstres();
   
});

// Fonction pour obtenir la liste des monsters capturés classés par la date de capture
function MonstersCaptures() {
    connection.query(`SELECT * FROM monster WHERE Capturee = 'Oui' ORDER BY \`Date de capture\` DESC`, (err, results) => {
        if (err) throw err;
        console.log('1. Liste des monsters capturés :');
        console.log(results);
        connection.end();
    });
}

// Fonction pour obtenir le nombre de monsters par type
function NumberTypeofMonster() {
    connection.query(`SELECT TRIM(Type) AS Type, COUNT(*) AS Nombre FROM monster GROUP BY TRIM(Type)`, (err, results) => {
        if (err) throw err;
        console.log('2. Nombre de monsters par type :');
        console.log(results);
    });
}

// Fonction pour obtenir pour chaque monster, son dresseur avec son nom et prénom dans le même champ nommé "dresseur"
function dresseurMonster() {
    connection.query(`SELECT m.*, CONCAT_WS(' ', IFNULL(d.Nom, 'aucun'), IFNULL(d.Prenom, '')) AS dresseur FROM monster m LEFT JOIN dresseur d ON m.ID_Dresseur = d.id`, (err, results) => {
        if (err) throw err;
        console.log('3. Dresseur de chaque monster :');
        console.log(results);
    });
}
// Fonction pour obtenir la liste des ventes
function listeVentes() {
    connection.query(`
    SELECT DATE_FORMAT(\`Date de vente\`, '%Y-%m-%d') AS DateVente, 
    monster.Nom AS NomMonster, 
    CONCAT_WS(' ', IFNULL(dresseur.Nom, 'aucun'), IFNULL(dresseur.Prenom, '')) AS NomDresseur, 
    magasin.Nom AS NomMagasin, 
    vente.Prix
    FROM vente
    JOIN monster ON vente.idMonster = monster.id
    LEFT JOIN dresseur ON monster.ID_Dresseur = dresseur.ID
    JOIN magasin ON vente.idMagasin = magasin.id
    ORDER BY \`Date de vente\` DESC;
    `, (err, results) => {
        if (err) throw err;
        console.log('Liste des ventes :');
        console.log(results);
        connection.end();
    });
}

function chiffreAffairesParMagasin() {
    connection.query(`
    SELECT magasin.Nom AS Magasin, 
           SUM(vente.Prix) AS CA
    FROM vente
    JOIN magasin ON vente.idMagasin = magasin.id
    GROUP BY magasin.Nom;
    `, (err, results) => {
        if (err) throw err;
        console.log('Chiffre d\'affaires total par magasin :');
        console.log(results);
        connection.end();
    });
}
function monstresAvecQuetes() {
    connection.query(`
    SELECT m.*, q.Début
    FROM monster m
    LEFT JOIN monster_quete mq ON m.ID = mq.Monster_ID
    LEFT JOIN quete q ON mq.quete_id = q.id
    ORDER BY q.Début DESC;
    `, (err, results) => {
        if (err) throw err;
        console.log('Monstres avec leurs quêtes (si disponibles) :');
        console.log(results);
        connection.end();
    });
}
function MonsterNocapture() {
    connection.query(`
    SELECT *
    FROM Monster
    WHERE Type = 'feu'
        AND Capturee ='Non'
        AND Niveau BETWEEN 2 AND 5
        AND \`Point de vie\` > 400
    ORDER BY \`Point de vie\` ASC;

    `, (err, results) => {
        if (err) throw err;
        console.log('Liste des monstres non capturées:');
        console.log(results);
        connection.end();
    });
}
function especesMonstres() {
    connection.query(`
    SELECT Espece, COUNT(*) AS Nombre_Monstres
    FROM Monster
    GROUP BY Espece
    HAVING COUNT(*) >= 4;
    `, (err, results) => {
        if (err) throw err;
        console.log('Liste des espèces avec au moins 4 monstres :');
        console.log(results);
        connection.end();
    });
}

function especesMonstres() {
    connection.query(`
    SELECT CONCAT_WS(' ', Nom, Prenom) AS Dresseur, SUM(Prix) AS Chiffre_Affaires
    FROM Dresseur
    JOIN Monster ON Dresseur.id = Monster.ID_Dresseur
    JOIN Vente ON Monster.idMonster = Vente.idMonster
    GROUP BY Dresseur;    
    `, (err, results) => {
        if (err) throw err;
        console.log('Liste des espèces avec au moins 4 monstres :');
        console.log(results);
        connection.end();
    });
}
