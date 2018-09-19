import {Issue} from './../models/Issue';
import _base from './_base-module';
import $ from "jquery";

const route = 'projects';
const Model = Issue;

const state = {
    all: [],
    current: null,
    filter: {
        project_id: 0
    }
};

const getters = {
    ..._base.getters,
    getFiltered(state, getters, rootState) {
        function matchesProject(issue) {
            if (state.filter.project_id === 0) {
                return true;
            } else {
                let projectsWithThisRepo, match;
                projectsWithThisRepo = rootState.projects.all.filter(function(project){
                    return project.repository_id === issue.repository.id;
                });
                match = projectsWithThisRepo.find(function(project){
                    return project._id === state.filter.project_id &&
                        (project.milestone_id === 0 || project.milestone_id === issue.milestone.id);
                });
                return match;
            }
        }

        return state.all.filter(function(issue) {
            return matchesProject(issue);
        }).sort((a, b) => b.updatedAt - a.updatedAt);
    }
};

const actions = {
    create(context, item){
        return _base.actions.create(context, item, route);
    },
    update(context, item){
        return _base.actions.update(context, item, route);
    },
    delete(context, item){
        return _base.actions.delete(context, item, route);
    },
    read(context, githubKey) {
        const url = 'https://api.github.com/issues?per_page=100&access_token=' + githubKey;
        $.ajax({
            'url': url,
            'type': 'GET',
            'headers': {
                'Accept': 'application/json'
            }
        }).done(function(response){
            context.commit('init', response);
        });
    }
};

const mutations = {
    init(state, set) {
        return _base.mutations.init(state, set, Model);
    },
    setCurrent(state, item) {
        return _base.mutations.setCurrent(state, item)
    },
    create(state, item) {
        return _base.mutations.create(state, item, Model);
    },
    update(state, item) {
        return _base.mutations.update(state, item, Model);
    },
    delete(state, item) {
        return _base.mutations.delete(state, item)
    },
    updateFilter(state, filter) {
        state.filter = {...filter};
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}