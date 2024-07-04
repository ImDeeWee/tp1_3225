// Cartographie entre les codons et les acides aminés
const codonMap = {
    'UUU': 'Phe', 'UUC': 'Phe', 'UUA': 'Leu', 'UUG': 'Leu',
    'CUU': 'Leu', 'CUC': 'Leu', 'CUA': 'Leu', 'CUG': 'Leu',
    'AUU': 'Ile', 'AUC': 'Ile', 'AUA': 'Ile', 'AUG': 'Met',
    'GUU': 'Val', 'GUC': 'Val', 'GUA': 'Val', 'GUG': 'Val',
    'UCU': 'Ser', 'UCC': 'Ser', 'UCA': 'Ser', 'UCG': 'Ser',
    'CCU': 'Pro', 'CCC': 'Pro', 'CCA': 'Pro', 'CCG': 'Pro',
    'ACU': 'Thr', 'ACC': 'Thr', 'ACA': 'Thr', 'ACG': 'Thr',
    'GCU': 'Ala', 'GCC': 'Ala', 'GCA': 'Ala', 'GCG': 'Ala',
    'UAU': 'Tyr', 'UAC': 'Tyr', 'UAA': 'STOP', 'UAG': 'STOP',
    'CAU': 'His', 'CAC': 'His', 'CAA': 'Gln', 'CAG': 'Gln',
    'AAU': 'Asn', 'AAC': 'Asn', 'AAA': 'Lys', 'AAG': 'Lys',
    'GAU': 'Asp', 'GAC': 'Asp', 'GAA': 'Glu', 'GAG': 'Glu',
    'UGU': 'Cys', 'UGC': 'Cys', 'UGA': 'STOP', 'UGG': 'Trp',
    'CGU': 'Arg', 'CGC': 'Arg', 'CGA': 'Arg', 'CGG': 'Arg',
    'AGU': 'Ser', 'AGC': 'Ser', 'AGA': 'Arg', 'AGG': 'Arg',
    'GGU': 'Gly', 'GGC': 'Gly', 'GGA': 'Gly', 'GGG': 'Gly'
};

// Chemins des images pour chaque acide aminé
const aminoAcidImages = {
    'Phe': 'images/phe.png',
    'Leu': 'images/leu.png',
    'Ile': 'images/ile.png',
    'Met': 'images/met.png',
    'Val': 'images/val.png',
    'Ser': 'images/ser.png',
    'Pro': 'images/pro.png',
    'Thr': 'images/thr.png',
    'Ala': 'images/ala.png',
    'Tyr': 'images/tyr.png',
    'His': 'images/his.png',
    'Gln': 'images/gln.png',
    'Asn': 'images/asn.png',
    'Lys': 'images/lys.png',
    'Asp': 'images/asp.png',
    'Glu': 'images/glu.png',
    'Cys': 'images/cys.png',
    'Trp': 'images/trp.png',
    'Arg': 'images/arg.png',
    'Gly': 'images/gly.png'
};

// Cartographie entre nom abrégés et complets
const nomComplet = {
    'Phe': 'Phénylalanine',
    'Leu': 'Leucine',
    'Ile': 'Isoleucine',
    'Met': 'Méthionine',
    'Val': 'Valine',
    'Ser': 'Sérine',
    'Pro': 'Proline',
    'Thr': 'Thréonine',
    'Ala': 'Alanine',
    'Tyr': 'Tyrosine',
    'His': 'Histidine',
    'Gln': 'Glutamine',
    'Asn': 'Asparagine',
    'Lys': 'Lysine',
    'Asp': 'Aspartate',
    'Glu': 'Glutamate',
    'Cys': 'Cystéine',
    'Trp': 'Tryptophane',
    'Arg': 'Arginine',
    'Gly': 'Glycine'
}

// Gestionnaire d'événements pour le bouton de réinitialisation
document.getElementById('clear-button').addEventListener('click', function() {
    const imgElement = document.getElementById('amino-acid-image');
    imgElement.style.display = 'none'; // Cache l'image
    imgElement.src = ''; // Enlève la source de l'image
    document.getElementById('selected-nucleotides').textContent = ''; // Efface les nucléotides sélectionnés
    selectedNucleotides = []; // Réinitialise le tableau des nucléotides sélectionnés
});

// Tableau pour stocker les nucléotides sélectionnés
let selectedNucleotides = [];

// Met à jour l'affichage des nucléotides sélectionnés
function updateSelectedNucleotidesDisplay() {
    document.getElementById('selected-nucleotides').textContent = selectedNucleotides.join('');
}

// Affiche l'image de l'acide aminé correspondant au codon formé
function displayAminoAcid() {
    const codon = selectedNucleotides.join('');
    const aminoAcid = codonMap[codon];
    if (aminoAcid) {
        const imgElement = document.getElementById('amino-acid-image');
        imgElement.src = aminoAcidImages[aminoAcid];
        imgElement.alt = aminoAcid;
        imgElement.style.display = 'block';
        selectedNucleotides = [];
    }
}

// Ajoute des gestionnaires pour chaque bouton de nucléotide
document.querySelectorAll('.nucleotide').forEach(button => {
    button.addEventListener('click', () => {
        if (selectedNucleotides.length < 3) {
            selectedNucleotides.push(button.getAttribute('data-nucleotide'));
            updateSelectedNucleotidesDisplay();
            if (selectedNucleotides.length === 3) {
                displayAminoAcid();
            }
        }
    });
});

// Gestionnaire pour démarrer l'animation de la séquence d'ARN
document.getElementById('start-animation').addEventListener('click', () => {
    const arnSequence = document.getElementById('arn-sequence').value.toUpperCase().replace(/\s/g, '');
    const animationSpeed = parseInt(document.getElementById('animation-speed').value, 10) || 500;
    const displayElement = document.getElementById('arn-display');
    const aminoAcidAnimation = document.getElementById('amino-acid-animation');
    const resultTable = document.getElementById('amino-acid-results');

    displayElement.innerHTML = '';
    aminoAcidAnimation.innerHTML = '';
    resultTable.innerHTML = '';
    let index = 0;
     
    // Fonction pour animer la séquence ARN
    function animateSequence() {
        if (index < arnSequence.length) {
            const codon = arnSequence.substring(index, index + 3);
            if (codon.length === 3) {
                const aminoAcid = codonMap[codon];
                displayElement.textContent = arnSequence.substring(0, index + 3);
                if (aminoAcid && aminoAcid !== 'STOP') {
                    const codonContainer = document.createElement('div');
                    codonContainer.style.display = 'flex';
                    codonContainer.style.flexDirection = 'column';
                    codonContainer.style.alignItems = 'center';
                    codonContainer.style.marginRight = '20px';

                    const codonTextElement = document.createElement('div');
                    codonTextElement.textContent = codon;
                    codonTextElement.style.fontWeight = 'bold';
                    codonTextElement.style.marginBottom = '5px';
                    codonContainer.appendChild(codonTextElement);

                    const imgElement = document.createElement('img');
                    imgElement.src = aminoAcidImages[aminoAcid];
                    imgElement.alt = aminoAcid;
                    imgElement.classList.add('fade-in');
                    setTimeout(() => imgElement.style.opacity = 1, 100);
                    codonContainer.appendChild(imgElement);
                    aminoAcidAnimation.appendChild(codonContainer);

                    const row = document.createElement('tr');
                    const nameCell = document.createElement('td');
                    nameCell.textContent = nomComplet[aminoAcid];
                    const abbrevCell = document.createElement('td');
                    abbrevCell.textContent = aminoAcid;
                    const imgCell = document.createElement('td');
                    const newImage = document.createElement('img');
                    newImage.src = aminoAcidImages[aminoAcid];
                    newImage.alt = aminoAcid;
                    newImage.style.width = '50px';
                    newImage.style.height = '50px';
                    imgCell.appendChild(newImage);
                    row.appendChild(nameCell);
                    row.appendChild(abbrevCell);
                    row.appendChild(imgCell);
                    resultTable.appendChild(row);
                }
                index += 3;
            } else {
                index += 3;
            }
            setTimeout(animateSequence, animationSpeed);
        }
    }

    animateSequence();
});












