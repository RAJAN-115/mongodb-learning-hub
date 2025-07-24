// MongoDB Learning Hub - Interactive JavaScript

// Application State
let currentSection = 'home';
let completedSections = new Set();
let quizState = {
    currentQuestion: 0,
    score: 0,
    answers: [],
    questions: [
        {
            question: "What is the primary difference between a SQL database and a NoSQL database like MongoDB?",
            options: [
                "SQL uses tables, NoSQL uses documents",
                "SQL is faster than NoSQL",
                "NoSQL can't handle relationships",
                "SQL is only for small datasets"
            ],
            correct: 0,
            explanation: "SQL databases are relational and use structured tables with fixed schemas, making them suitable for well-defined data. NoSQL databases like MongoDB are non-relational, document-oriented, and offer flexible, schemaless data storage, ideal for dynamic or evolving data models."
        },
        {
            question: "What does BSON stand for in MongoDB?",
            options: [
                "Basic Standard Object Notation",
                "Binary JSON",
                "Better Standard Object Notation",
                "Byte Standard Object Notation"
            ],
            correct: 1,
            explanation: "BSON stands for Binary JSON. It is the binary representation of JSON used by MongoDB for data storage and transmission, offering higher read and write speeds compared to plain JSON."
        },
        {
            question: "Which operator is used to update a field in MongoDB?",
            options: [
                "$update",
                "$modify",
                "$set",
                "$change"
            ],
            correct: 2,
            explanation: "$set is the operator used to set the value of a field in MongoDB. It can also add new fields if they don't exist."
        },
        {
            question: "What is the default storage engine for MongoDB since version 3.2?",
            options: [
                "MMAPV1",
                "WiredTiger",
                "RocksDB",
                "InMemory"
            ],
            correct: 1,
            explanation: "WiredTiger is the default storage engine for MongoDB since version 3.2, offering better performance and compression compared to the older MMAPV1 engine."
        },
        {
            question: "Which aggregation stage is used to filter documents in the pipeline?",
            options: [
                "$filter",
                "$match",
                "$find",
                "$where"
            ],
            correct: 1,
            explanation: "$match is the aggregation stage used to filter documents in the pipeline, similar to the find() method but within the aggregation framework."
        },
        {
            question: "What is the maximum document size in MongoDB?",
            options: [
                "8 MB",
                "16 MB",
                "32 MB",
                "64 MB"
            ],
            correct: 1,
            explanation: "The maximum BSON document size in MongoDB is 16 megabytes. This limit helps ensure that a single document cannot consume an excessive amount of RAM."
        },
        {
            question: "Which method is used to create an index in MongoDB?",
            options: [
                "db.collection.addIndex()",
                "db.collection.createIndex()",
                "db.collection.makeIndex()",
                "db.collection.buildIndex()"
            ],
            correct: 1,
            explanation: "db.collection.createIndex() is the method used to create indexes in MongoDB. Indexes improve query performance by creating efficient data structures for searches."
        },
        {
            question: "What does the $unwind stage do in MongoDB aggregation?",
            options: [
                "Sorts documents in descending order",
                "Groups documents by a field",
                "Deconstructs an array field into separate documents",
                "Removes duplicate documents"
            ],
            correct: 2,
            explanation: "$unwind deconstructs an array field from input documents to output a document for each element of the array. This is useful for processing arrays in aggregation pipelines."
        },
        {
            question: "Which of the following is NOT a valid comparison operator in MongoDB?",
            options: [
                "$gt",
                "$lte",
                "$equals",
                "$ne"
            ],
            correct: 2,
            explanation: "$equals is not a valid MongoDB operator. The correct operator for equality comparison is $eq, though equality can also be expressed implicitly without an operator."
        },
        {
            question: "What is the purpose of the _id field in MongoDB documents?",
            options: [
                "To store the document creation timestamp",
                "To serve as the primary key and unique identifier",
                "To indicate the document type",
                "To store the document size"
            ],
            correct: 1,
            explanation: "The _id field serves as the primary key for MongoDB documents and ensures each document has a unique identifier. It is automatically created if not provided and is indexed by default."
        }
    ]
};

// Glossary data
const glossaryTerms = [
    {
        term: "Database",
        definition: "A container for collections in MongoDB. Databases organize and group related collections together.",
        category: "basic",
        example: "use myStore; // Creates or switches to 'myStore' database"
    },
    {
        term: "Collection",
        definition: "A grouping of MongoDB documents, equivalent to a table in relational databases. Collections do not enforce a schema.",
        category: "basic",
        example: "db.users.insertOne({name: 'Alice'}); // 'users' is a collection"
    },
    {
        term: "Document",
        definition: "A record in MongoDB, stored in BSON format. Documents consist of field-value pairs and can have nested structures.",
        category: "basic",
        example: "{ name: 'John', age: 30, hobbies: ['reading', 'gaming'] }"
    },
    {
        term: "BSON",
        definition: "Binary JSON - a binary-encoded serialization format used to store documents and make remote procedure calls in MongoDB.",
        category: "basic",
        example: "JSON is converted to BSON for efficient storage and processing"
    },
    {
        term: "$match",
        definition: "An aggregation pipeline stage that filters documents based on specified conditions, similar to find().",
        category: "operators",
        example: "{ $match: { age: { $gte: 21 } } }"
    },
    {
        term: "$group",
        definition: "An aggregation stage that groups documents by a specified field and performs aggregate operations.",
        category: "operators",
        example: "{ $group: { _id: '$department', count: { $sum: 1 } } }"
    },
    {
        term: "$project",
        definition: "An aggregation stage that reshapes documents by including, excluding, or creating new fields.",
        category: "operators",
        example: "{ $project: { name: 1, age: 1, _id: 0 } }"
    },
    {
        term: "Index",
        definition: "A data structure that improves query performance by creating efficient access paths to data.",
        category: "advanced",
        example: "db.users.createIndex({ email: 1 })"
    },
    {
        term: "Aggregation Framework",
        definition: "A powerful feature for performing complex data transformations and analysis through pipeline stages.",
        category: "advanced",
        example: "db.sales.aggregate([{ $match: {...} }, { $group: {...} }])"
    },
    {
        term: "Cursor",
        definition: "A pointer to the result set of a query, allowing efficient retrieval of large datasets in batches.",
        category: "advanced",
        example: "db.collection.find().limit(10).skip(20)"
    },
    {
        term: "$set",
        definition: "An update operator that sets the value of a field in a document, creating the field if it doesn't exist.",
        category: "operators",
        example: "{ $set: { age: 31, lastUpdated: new Date() } }"
    },
    {
        term: "$unset",
        definition: "An update operator that removes a specified field from a document.",
        category: "operators",
        example: "{ $unset: { temporaryField: 1 } }"
    },
    {
        term: "$push",
        definition: "An update operator that adds an element to an array field.",
        category: "operators",
        example: "{ $push: { hobbies: 'photography' } }"
    },
    {
        term: "$pull",
        definition: "An update operator that removes elements from an array that match a specified condition.",
        category: "operators",
        example: "{ $pull: { scores: { $lt: 50 } } }"
    },
    {
        term: "MongoDB Atlas",
        definition: "MongoDB's fully managed cloud database service for easy deployment and scaling.",
        category: "basic",
        example: "Cloud-hosted MongoDB with automated backups and scaling"
    },
    {
        term: "Mongoose",
        definition: "An Object Data Modeling (ODM) library for MongoDB and Node.js that provides schema-based modeling.",
        category: "advanced",
        example: "const userSchema = new mongoose.Schema({...})"
    },
    {
        term: "Replica Set",
        definition: "A group of MongoDB processes that maintain the same data set for high availability and data redundancy.",
        category: "advanced",
        example: "A primary and secondary nodes configuration"
    },
    {
        term: "Sharding",
        definition: "A method for distributing data across multiple machines to support horizontal scaling.",
        category: "advanced",
        example: "Data distributed across multiple shards based on shard key"
    }
];

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupEventListeners();
    loadGlossary();
    updateProgress();
});

// Initialize Application
function initializeApp() {
    showSection('home');
    loadQuizQuestion();
}

// Setup Event Listeners
function setupEventListeners() {
    // Navigation
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const section = this.getAttribute('data-section');
            navigateToSection(section);
        });
    });

    // Theme toggle
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }

    // Quiz navigation
    setupQuizControls();
    
    // Modal close
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal') || e.target.classList.contains('modal-close')) {
            closeModal();
        }
    });

    // Escape key to close modal
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
}

// Navigation Functions
function navigateToSection(sectionId) {
    showSection(sectionId);
    updateNavigation(sectionId);
    currentSection = sectionId;
    
    // Scroll to top of content
    document.querySelector('.main-content').scrollTop = 0;
    
    // Add fade-in animation
    const section = document.getElementById(sectionId);
    if (section) {
        section.classList.add('fade-in');
        setTimeout(() => section.classList.remove('fade-in'), 300);
    }
}

function showSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Show target section
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
    }
}

function updateNavigation(sectionId) {
    // Update nav links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    
    const activeLink = document.querySelector(`[data-section="${sectionId}"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }
}

function startLearning() {
    navigateToSection('overview');
}

// Section Completion
function markSectionComplete(sectionId) {
    completedSections.add(sectionId);
    updateProgress();
    
    // Show completion message
    showNotification(`🎉 ${getSectionTitle(sectionId)} completed!`, 'success');
}

function getSectionTitle(sectionId) {
    const titles = {
        'overview': 'MongoDB Overview',
        'basics': 'Basic Operations',
        'advanced': 'Advanced Concepts',
        'tools': 'Tools & Development',
        'quiz': 'Practice Quiz',
        'glossary': 'Glossary'
    };
    return titles[sectionId] || sectionId;
}

// Progress Tracking
function updateProgress() {
    const totalSections = 5; // overview, basics, advanced, tools, quiz
    const completed = completedSections.size;
    const percentage = (completed / totalSections) * 100;
    
    const progressFill = document.getElementById('overall-progress');
    const progressText = document.getElementById('progress-percentage');
    
    if (progressFill) {
        progressFill.style.width = `${percentage}%`;
    }
    
    if (progressText) {
        progressText.textContent = `${Math.round(percentage)}%`;
    }
}

// Theme Toggle
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-color-scheme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-color-scheme', newTheme);
    
    const themeIcon = document.querySelector('#theme-toggle i');
    if (themeIcon) {
        themeIcon.className = newTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }
}

// Interactive Elements
function showTab(tabId) {
    // Hide all tab contents in the same parent
    const parent = event.target.closest('.crud-operation') || event.target.closest('.concept-card');
    if (parent) {
        parent.querySelectorAll('.tab-content').forEach(content => {
            content.classList.add('hidden');
        });
        
        parent.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.remove('active');
        });
    }
    
    // Show selected tab
    const targetTab = document.getElementById(tabId);
    if (targetTab) {
        targetTab.classList.remove('hidden');
    }
    
    // Activate button
    event.target.classList.add('active');
}

function copyCode(code) {
    // Create temporary textarea to copy text
    const textarea = document.createElement('textarea');
    textarea.value = code;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    
    showNotification('Code copied to clipboard!', 'success');
}

function showTermDetails(termName) {
    const termData = glossaryTerms.find(term => 
        term.term.toLowerCase() === termName.toLowerCase()
    );
    
    if (termData) {
        document.getElementById('modal-term-title').textContent = termData.term;
        document.getElementById('modal-term-definition').textContent = termData.definition;
        
        const exampleSection = document.getElementById('modal-term-example');
        if (termData.example) {
            exampleSection.innerHTML = `
                <h4>Example:</h4>
                <div class="code-example">${termData.example}</div>
            `;
            exampleSection.style.display = 'block';
        } else {
            exampleSection.style.display = 'none';
        }
        
        document.getElementById('term-modal').classList.remove('hidden');
    }
}

function closeModal() {
    document.getElementById('term-modal').classList.add('hidden');
}

// Quiz Functionality
function setupQuizControls() {
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const submitBtn = document.getElementById('submit-btn');
    
    if (prevBtn) prevBtn.addEventListener('click', previousQuestion);
    if (nextBtn) nextBtn.addEventListener('click', nextQuestion);
    if (submitBtn) submitBtn.addEventListener('click', submitQuiz);
}

function loadQuizQuestion() {
    const question = quizState.questions[quizState.currentQuestion];
    if (!question) return;
    
    // Update question text
    const questionText = document.getElementById('question-text');
    if (questionText) {
        questionText.textContent = question.question;
    }
    
    // Update options
    const optionsContainer = document.getElementById('options-container');
    if (optionsContainer) {
        optionsContainer.innerHTML = '';
        
        question.options.forEach((option, index) => {
            const button = document.createElement('button');
            button.className = 'option-btn';
            button.textContent = option;
            button.onclick = () => selectOption(index);
            optionsContainer.appendChild(button);
        });
    }
    
    // Update progress
    updateQuizProgress();
    
    // Update navigation buttons
    updateQuizNavigation();
    
    // Hide feedback
    const feedback = document.getElementById('question-feedback');
    if (feedback) {
        feedback.style.display = 'none';
    }
}

function selectOption(optionIndex) {
    const question = quizState.questions[quizState.currentQuestion];
    const options = document.querySelectorAll('.option-btn');
    
    // Clear previous selections
    options.forEach(btn => {
        btn.classList.remove('selected', 'correct', 'incorrect');
    });
    
    // Mark selected option
    options[optionIndex].classList.add('selected');
    
    // Store answer
    quizState.answers[quizState.currentQuestion] = optionIndex;
    
    // Show feedback
    const feedback = document.getElementById('question-feedback');
    if (feedback) {
        const isCorrect = optionIndex === question.correct;
        
        feedback.innerHTML = `
            <div class="feedback-result ${isCorrect ? 'correct' : 'incorrect'}">
                <strong>${isCorrect ? '✅ Correct!' : '❌ Incorrect'}</strong>
            </div>
            <p><strong>Explanation:</strong> ${question.explanation}</p>
        `;
        feedback.style.display = 'block';
        
        // Update option colors
        options[question.correct].classList.add('correct');
        if (optionIndex !== question.correct) {
            options[optionIndex].classList.add('incorrect');
        }
        
        // Update score
        if (isCorrect && quizState.answers[quizState.currentQuestion] !== optionIndex) {
            quizState.score++;
        } else if (!isCorrect && quizState.answers[quizState.currentQuestion] === question.correct) {
            quizState.score--;
        }
        
        updateQuizStats();
    }
    
    // Enable next button
    const nextBtn = document.getElementById('next-btn');
    if (nextBtn) {
        nextBtn.disabled = false;
    }
}

function nextQuestion() {
    if (quizState.currentQuestion < quizState.questions.length - 1) {
        quizState.currentQuestion++;
        loadQuizQuestion();
    }
}

function previousQuestion() {
    if (quizState.currentQuestion > 0) {
        quizState.currentQuestion--;
        loadQuizQuestion();
    }
}

function updateQuizProgress() {
    const progress = ((quizState.currentQuestion + 1) / quizState.questions.length) * 100;
    const progressBar = document.getElementById('quiz-progress');
    if (progressBar) {
        progressBar.style.width = `${progress}%`;
    }
    
    const currentQuestionSpan = document.getElementById('current-question');
    if (currentQuestionSpan) {
        currentQuestionSpan.textContent = quizState.currentQuestion + 1;
    }
}

function updateQuizNavigation() {
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const submitBtn = document.getElementById('submit-btn');
    
    if (prevBtn) {
        prevBtn.disabled = quizState.currentQuestion === 0;
    }
    
    if (nextBtn && submitBtn) {
        if (quizState.currentQuestion === quizState.questions.length - 1) {
            nextBtn.style.display = 'none';
            submitBtn.style.display = 'inline-block';
        } else {
            nextBtn.style.display = 'inline-block';
            submitBtn.style.display = 'none';
            nextBtn.disabled = quizState.answers[quizState.currentQuestion] === undefined;
        }
    }
}

function updateQuizStats() {
    const scoreSpan = document.getElementById('quiz-score');
    if (scoreSpan) {
        scoreSpan.textContent = quizState.score;
    }
}

function submitQuiz() {
    // Calculate final score
    let finalScore = 0;
    quizState.questions.forEach((question, index) => {
        if (quizState.answers[index] === question.correct) {
            finalScore++;
        }
    });
    
    quizState.score = finalScore;
    
    // Show results
    document.getElementById('quiz-content').style.display = 'none';
    document.getElementById('quiz-results').style.display = 'block';
    
    // Update results display
    document.getElementById('final-score').textContent = finalScore;
    document.getElementById('total-score').textContent = quizState.questions.length;
    
    // Show score message
    const percentage = (finalScore / quizState.questions.length) * 100;
    const scoreMessage = document.getElementById('score-message');
    if (scoreMessage) {
        if (percentage >= 90) {
            scoreMessage.textContent = '🌟 Excellent! You have mastered MongoDB concepts!';
            scoreMessage.className = 'score-message excellent';
        } else if (percentage >= 70) {
            scoreMessage.textContent = '👍 Great job! You have a solid understanding of MongoDB.';
            scoreMessage.className = 'score-message good';
        } else if (percentage >= 50) {
            scoreMessage.textContent = '📚 Good effort! Review the concepts and try again.';
            scoreMessage.className = 'score-message average';
        } else {
            scoreMessage.textContent = '🔄 Keep learning! Review the lessons and take the quiz again.';
            scoreMessage.className = 'score-message needs-improvement';
        }
    }
    
    // Mark quiz as completed
    markSectionComplete('quiz');
}

function restartQuiz() {
    // Reset quiz state
    quizState.currentQuestion = 0;
    quizState.score = 0;
    quizState.answers = [];
    
    // Show quiz content, hide results
    document.getElementById('quiz-content').style.display = 'block';
    document.getElementById('quiz-results').style.display = 'none';
    
    // Load first question
    loadQuizQuestion();
    updateQuizStats();
}

// Glossary Functions
function loadGlossary() {
    const glossaryGrid = document.getElementById('glossary-grid');
    if (!glossaryGrid) return;
    
    glossaryGrid.innerHTML = '';
    
    glossaryTerms.forEach(term => {
        const termElement = document.createElement('div');
        termElement.className = 'glossary-term';
        termElement.setAttribute('data-category', term.category);
        termElement.onclick = () => showTermDetails(term.term);
        
        termElement.innerHTML = `
            <h4>${term.term}</h4>
            <p>${term.definition}</p>
            <span class="term-category">${term.category}</span>
        `;
        
        glossaryGrid.appendChild(termElement);
    });
}

function searchGlossary() {
    const searchTerm = document.getElementById('glossary-search').value.toLowerCase();
    const glossaryTerms = document.querySelectorAll('.glossary-term');
    
    glossaryTerms.forEach(termElement => {
        const termText = termElement.textContent.toLowerCase();
        if (termText.includes(searchTerm)) {
            termElement.style.display = 'block';
        } else {
            termElement.style.display = 'none';
        }
    });
}

function filterGlossary(category) {
    const glossaryTerms = document.querySelectorAll('.glossary-term');
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    // Update active filter button
    filterButtons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    // Filter terms
    glossaryTerms.forEach(termElement => {
        if (category === 'all' || termElement.getAttribute('data-category') === category) {
            termElement.style.display = 'block';
        } else {
            termElement.style.display = 'none';
        }
    });
}

// Utility Functions
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.innerHTML = `
        <span>${message}</span>
        <button onclick="this.parentElement.remove()">&times;</button>
    `;
    
    // Add styles for notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--color-surface);
        border: 1px solid var(--color-border);
        border-radius: var(--radius-base);
        padding: var(--space-12) var(--space-16);
        box-shadow: var(--shadow-lg);
        z-index: 1000;
        display: flex;
        align-items: center;
        gap: var(--space-12);
        min-width: 300px;
        color: var(--color-text);
    `;
    
    // Add type-specific styling
    if (type === 'success') {
        notification.style.borderColor = 'var(--color-success)';
        notification.style.backgroundColor = 'rgba(var(--color-success-rgb), 0.1)';
    } else if (type === 'error') {
        notification.style.borderColor = 'var(--color-error)';
        notification.style.backgroundColor = 'rgba(var(--color-error-rgb), 0.1)';
    }
    
    // Add close button styling
    const closeBtn = notification.querySelector('button');
    closeBtn.style.cssText = `
        background: none;
        border: none;
        font-size: var(--font-size-lg);
        cursor: pointer;
        color: var(--color-text-secondary);
        padding: 0;
        margin-left: auto;
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 3000);
}

// Memory Hook Display Functions
function showMemoryHook(concept) {
    const memoryHooks = {
        'mongo': 'MONGO = Massively Organized Non-relational Great Objects',
        'crud': 'CRUD = Create, Read, Update, Delete - like organizing your digital life!',
        'aggregation': 'MAGIC Pipeline = Match, Aggregate, Group, Include, Count',
        'bson': 'BSON = Better Speed, Optimized Navigation (faster than JSON)',
        'indexes': 'INDEX = Instant Navigation for Database EXcellence'
    };
    
    const hook = memoryHooks[concept];
    if (hook) {
        showNotification(`💡 Memory Hook: ${hook}`, 'info');
    }
}

// Initialize tooltips and interactive elements
function initializeInteractiveElements() {
    // Add hover effects to concept cards
    document.querySelectorAll('.concept-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.02)';
            this.style.transition = 'transform 0.2s ease';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
    // Add click effects to buttons
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 100);
        });
    });
}

// Advanced Features
function exportProgress() {
    const progressData = {
        completedSections: Array.from(completedSections),
        quizScore: quizState.score,
        currentSection: currentSection,
        timestamp: new Date().toISOString()
    };
    
    const dataStr = JSON.stringify(progressData, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    
    const link = document.createElement('a');
    link.href = URL.createObjectURL(dataBlob);
    link.download = 'mongodb-learning-progress.json';
    link.click();
    
    showNotification('Progress exported successfully!', 'success');
}

function printSection() {
    window.print();
}

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Alt + number keys for navigation
    if (e.altKey && e.key >= '1' && e.key <= '6') {
        e.preventDefault();
        const sections = ['overview', 'basics', 'advanced', 'tools', 'quiz', 'glossary'];
        const sectionIndex = parseInt(e.key) - 1;
        if (sections[sectionIndex]) {
            navigateToSection(sections[sectionIndex]);
        }
    }
    
    // Arrow keys for quiz navigation
    if (currentSection === 'quiz') {
        if (e.key === 'ArrowLeft' && !document.getElementById('prev-btn').disabled) {
            previousQuestion();
        } else if (e.key === 'ArrowRight' && !document.getElementById('next-btn').disabled) {
            nextQuestion();
        }
    }
});

// Initialize interactive elements when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    initializeInteractiveElements();
    
    // Set initial quiz stats
    document.getElementById('total-questions').textContent = quizState.questions.length;
    updateQuizStats();
});

// Performance optimization - lazy load heavy content
function lazyLoadSection(sectionId) {
    // This could be used to load content dynamically for better performance
    // For now, all content is pre-loaded
    return Promise.resolve();
}

// Analytics placeholder (for tracking learning progress)
function trackEvent(eventName, properties = {}) {
    console.log(`Event: ${eventName}`, properties);
    // In a real application, this would send data to analytics service
}

// Track section visits
function trackSectionVisit(sectionId) {
    trackEvent('section_visit', {
        section: sectionId,
        timestamp: new Date().toISOString()
    });
}

// Enhanced navigation with tracking
const originalNavigateToSection = navigateToSection;
navigateToSection = function(sectionId) {
    originalNavigateToSection(sectionId);
    trackSectionVisit(sectionId);
};

// Error handling
window.addEventListener('error', function(e) {
    console.error('Application error:', e.error);
    showNotification('An error occurred. Please refresh the page.', 'error');
});

// Service worker registration (for offline capability)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // Service worker would be registered here in a production environment
        console.log('Service worker support detected');
    });
}