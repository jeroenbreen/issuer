class Repository {
    constructor(repository) {
        this.id = repository.id;
        this.name = repository.name;
        this.openIssues = repository.open_issues;
        this.url = repository.url;
        this.owner = {...repository.owner};
    }

    toBackend() {
        return {...this};
    }
}

export {Repository}