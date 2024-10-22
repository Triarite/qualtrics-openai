body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
}

header {
    background-color: #002147;
    color: white;
    display: flex;
    justify-content: space-between;
    padding: 20px;
}

.logo {
    font-size: 24px;
    font-weight: bold;
}

nav ul {
    list-style: none;
    display: flex;
    gap: 20px;
}

nav a {
    color: white;
    text-decoration: none;
}

.featured {
    position: relative;
    color: white;
    height: 400px;
    overflow: hidden;
}

.featured img {
    width: 100%;
    height: auto;
}

.featured-info {
    position: absolute;
    bottom: 20px;
    left: 20px;
}

.featured-info h2 {
    font-size: 36px;
}

.featured-info p {
    margin: 10px 0;
}

button {
    padding: 10px 20px;
    background-color: #d0a627;
    color: white;
    border: none;
    cursor: pointer;
}

.movie-grid {
    padding: 20px;
}

.movie-grid h2 {
    margin-bottom: 10px;
}

.grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 10px;
}

.movie-item img {
    width: 100%;
    height: auto;
    border-radius: 4px;
}

footer {
    background-color: #002147;
    color: white;
    text-align: center;
    padding: 10px 0;
}
