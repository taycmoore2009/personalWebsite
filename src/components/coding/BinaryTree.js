import React from 'react';

import { withStyles } from '@material-ui/styles';
import { PropTypes } from 'prop-types';
import { Grid } from '@material-ui/core';

import TextInput from '../forms/TextInput';
import InputButton from '../forms/Button'

const styles = () => ({
    wrapper: {
        padding: '20px 0'
    },
    input: {
        width: '200px',
        margin: '20px 10px'
    },
    button: {
        height: '58px',
        margin: '20px 10px'
    },
    tree: {
        lineHeight: '14px'
    },
    node: {
        position: 'relative',
        '&:after': {
            content: '" "',
            background: '#FFF',
            width: 'calc(100% - 16px)',
            height: '1px',
            position: 'absolute',
            left: '8px',
            bottom: '0px'
        }
    },
    nodeContainer: {
        position: 'relative',
        top: '-8px'
    }
});

class Node extends React.Component {
    render = () => {
        const { classes, branch } = this.props;

        return (
            <Grid item className={classes.nodeContainer}>
                <Grid container spacing={branch.children.length} justify='space-around' align='center'>
                    <Grid item md={12} className={branch.children.length > 1 ? classes.node : ''} >
                        <Grid item md={12}>|</Grid>
                        <Grid item md={12}>{branch.value}</Grid>
                    </Grid>
                    {branch.children.map((node, i) => {
                        return (
                            <Node classes={classes} branch={node} key={i}/>
                        )
                    })}
                </Grid>
           </Grid>
        )
    }
}

class BinaryTree extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tree: [
                {
                    value: 'a',
                    children: []
                }
            ]
        }

        // References
        this.nameInputField = React.createRef();
        this.locationInputField = React.createRef();
    };

    addNode = () => {
        const nodeLocation = this.locationInputField.current.value;
        const nodeName = this.nameInputField.current.value;
        const { tree } = this.state;
        const node = this.findNode(nodeLocation, tree[0]);
        if(node) {
            node.children.push({
                value: nodeName,
                children: []
            });
            this.setState({tree})
            this.resetFields(tree);
        } else {
            console.warn('Node missing!', nodeLocation);
        }
    }

    findNode = (branch, startingBranch = this.state.tree[0]) => {
        let foundBranch = false;

        if(startingBranch.value === branch) {
            return startingBranch;
        }
        for(let i = 0; i < startingBranch.children.length; i++) {
            foundBranch = this.findNode(branch, startingBranch.children[i]);
            if(foundBranch) {
                break;
            }
        }

        return foundBranch;
    }

    resetFields = () => {
        this.locationInputField.current.value = '';
        this.nameInputField.current.value = '';
    }
    
    GenerateTree = (branch = this.state.tree) => {
        const { classes } = this.props;
        return (
            <Grid container spacing={branch[0].children.length} justify='space-around' align='center' className={classes.tree}>
                <Node branch={branch[0]} classes={classes} />
            </Grid>
        )
    }

    render = () => {
        const { classes } = this.props;

        const renderedTree = this.GenerateTree();

        return (
            <Grid item md={12} className={classes.wrapper}>
                Create your very own binary tree and try out different searching algorithms<br/>
                The first node is always A
                <Grid container justify='center' align='center'>
                    <TextInput
                        label='Node Name'
                        styles={classes.input}
                        helperText='Name of node that will be shown'
                        refer={this.nameInputField}
                    />
                    <TextInput
                        label='Node Location'
                        styles={classes.input}
                        helperText='Location on tree node will branch from'
                        refer={this.locationInputField}
                    />
                    <InputButton
                        classes={classes.button}
                        label='Add Node'
                        onClick={this.addNode}
                    />
                </Grid>
                {renderedTree}
            </Grid>
        );
    }
}

BinaryTree.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(BinaryTree);