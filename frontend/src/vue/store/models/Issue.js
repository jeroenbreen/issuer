class Issue {
    constructor(issue) {
        this.id = issue.id;
        this.number = issue.number;
        this.title = issue.title;
        this.status = issue.state;
        this.assignees = [...issue.assignees];
        this.repository = {...issue.repository};
        this.milestone = {...issue.milestone};
    }
}

export {Issue};