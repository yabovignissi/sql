const mysql = require('mysql2');
const csv = require('csv-parser');
let fs = require('fs');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'rootroot',
});



function createTables() {
    connection.query('CREATE DATABASE IF NOT EXISTS monstermon', (err) => {
        if (err) {
            console.error('Erreur lors de la création de la base de données :', err);
            return;
        }
        console.log('Base de données monstermon créée ou déjà existante.');
        
        connection.query('USE monstermon', (err) => {
            if (err) {
                console.error('Erreur lors de la sélection de la base de données :', err);
                return;
            }
            console.log('Base de données sélectionnée.');
            
            const sqlFilesPath = './tables/';
            const sqlFiles = [
                'espece.sql',
                'dresseur.sql',
                'monster.sql',
                'arene.sql',
                'magasin.sql',
                'evenement.sql',
                'equipement.sql',
                'quete.sql',
                'ventes.sql',
                'monster_quete.sql',
                'combat.sql'
            ];
            
            sqlFiles.forEach((fileName) => {
                const sqlFilePath = sqlFilesPath + fileName;
                const sqlQuery = fs.readFileSync(sqlFilePath, 'utf-8');
                
                connection.query(sqlQuery, (err) => {
                    if (err) {
                        console.error(`Erreur lors de la création de la table à partir de ${fileName}:`, err);
                        return;
                    }
                    console.log(`Tables créées à partir de ${fileName}.`);
                });
            });
        });
    });
}




async function addTables() {
    const csvFilesPath = './fichier-initiaux/';

    const csvFiles = [
        'espece.csv',
        'dresseur.csv',
        'monster.csv',
        'arene.csv',
        'magasin.csv',
         'evenement.csv',
         'equipement.csv',
        'quete.csv',
        'monster_quete.csv',
        "combat.csv"

    ];

    try {
        await new Promise((resolve, reject) => {
            connection.query('USE monstermon', (error) => {
                if (error) reject(error);
                resolve();
            });
        });

        for (const fileName of csvFiles) {
            const csvFilePath = csvFilesPath + fileName;
            await new Promise((resolve, reject) => {
                fs.createReadStream(csvFilePath)
                    .pipe(csv({ separator: ';' }))
                    .on('data', async (row) => {
                        
                            switch (fileName) {
                                case 'dresseur.csv':
                                    row.professeur_id = row.professeur_id ? row.professeur_id : null;
                                    break;
                                case 'monster.csv':
                                    (row.Taille==""||row.Taille==" ")?row.Taille=null:row.Taille=row.Taille;
                                    (row.Espece==""||row.Espece==" ")?row.Espece=null:row.Espece=row.Espece;
                                    (row.ID_Dresseur==""||row.ID_Dresseur==" ")?row.ID_Dresseur=null:row.ID_Dresseur=row.ID_Dresseur;
                                    (row.Niveau==""||row.Niveau==" ")?row.Niveau=null:row.Niveau=row.Niveau;
                                    (row["Date de capture"]==""||row["Date de capture"]==" ")?row["Date de capture"]=null:row["Date de capture"]=row["Date de capture"];
                                    break;
                                 case 'arene.csv':
                                    row["Nombre de place"]==""?row["Nombre de place"]=null:row["Nombre de place"]=row["Nombre de place"];
                                    row["Taille (en m2)"]==""?row["Taille (en m2)"]=null:row["Taille (en m2)"]=row["Taille (en m2)"];  
                                    break;
                                case 'quete.csv':
                                       row.Fin==""?row.Fin=null:row.Fin=row.Fin; 
                                       break;      
                            }

                            await new Promise((resolveInsert, rejectInsert) => {
                                connection.query('INSERT INTO ' + fileName.split('.')[0] + ' SET ?', row, (error) => {
                                    if (error) rejectInsert(error);
                                    console.log(`Données insérées dans la table ${fileName.split('.')[0]}.`);
                                    resolveInsert();
                                });
                            });
                    
                    })
                    .on('end', () => {
                        console.log(`Lecture du fichier ${fileName} terminée.`);
                        resolve();
                    })
                    .on('error', (error) => {
                        console.error(error)
                        reject(error);

                    });
            });
        }
    } catch (error) {
        console.error('Une erreur est survenue :', error);
        throw error
    }
}


function DropTables() {
    const tablesToDrop = [
        'combat',
        'monster_quete',
        'vente',
        'quete',
        'equipement',
        'evenement',
        'arene',
        'magasin',
        'monster',
        'dresseur',
        'espece'
    ];

    tablesToDrop.forEach((tableName) => {
        const sqlQuery = `DROP TABLE IF EXISTS \`monstermon\`.\`${tableName}\`;`;

        connection.query(sqlQuery, (err) => {
            if (err) throw err;
            console.log(`Table ${tableName} supprimée.`);
        });
    });

    const dropDatabaseQuery = `DROP DATABASE IF EXISTS \`monstermon\`;`;

    connection.query(dropDatabaseQuery, (err) => {
        if (err) throw err;
        console.log(`Base de données monstermon supprimée.`);
    });
}


const argument = process.argv[2];
switch (argument) {
    case 'create':
        createTables();
        break;
    case 'add':
        addTables();
        break;
     case 'drop':
        DropTables();
        break;
    default:
        console.log('Utilisation :npm run dev  [create |add | drop]');
}