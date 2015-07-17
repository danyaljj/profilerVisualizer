'use strict';

const React = require('react');
const Qwest = require('qwest');

var aboutGlobal = 'ABOUT TODO';
var helpGloabl = 'HELP TODO';

var role_pairwise = [
// basic
    'before', 'adjacent before', 'nearest before',
    'after', 'adjacent after', 'nearest after',
    'immediately before', 'immediately after',
    'same span', 'contained in',
// dependency
    'dependency'
];

var role_simple_before = [
    'before', 'adjacent before', 'nearest before'
];

var role_simple_after = [
    'after', 'adjacent after', 'nearest after'
];

var role_simple_before2 = [
    'immediately before'
];
var role_simple_after2 = [
    'immediately after'
];

var role_simple_neitherBeforeAfter = [
    'same span', '', ''
];

var triple_roles = ['Before', 'After', 'Co-referred before', 'Co-referred after'];
var triple_roles_subjObj = ['Subj', 'Obj'];

var attributes = ['NER', 'Noun', 'Noun Phrase', 'Modifier', 'Verb', 'Verb Phrase', 'Entity', 'Raw Text'];

var triple_attribbutes = ['Raw Text', 'Aggregate'];

var attribute_raw_text = ['Raw Text'];

var triple_aggregation_types = ['no', 'co-referred-element', 'both'];

var pairwiseSchemaSimple = [
    'NER_SAME_SPAN',
    'NER_AFTER',
    'NER_BEFORE',
    'NER_NEAREST_BEFORE',
    'NER_NEAREST_AFTER',
    'NER_ADJACENT_BEFORE',
    'NER_ADJACENT_AFTER',
    'NPB',
    'NNPB',
    'NNPA',
    'NPIA',
    'NPIB',
    'NPC',
    'NPA',
    'NNB',
    'NNA',
    'NVB',
    'NVA',
    'VPB',
    'NVPB',
    'VPIB',
    'VPIA',
    'NVPA',
    'VPA',
    'MOD',
    'EB',
    'EA'
];

var pairwiseSchema = [
    'NEAREST_NER_PAIR',
    'NEAREST_POS_PAIR'
];

var tripleSchema = [

];

var quadrupleSchema = [

];

var sixTupleSchema = [

];

var schemaBasic = [
    ['NER_SAME_SPAN', 'NER at the same span'],
    ['NER_AFTER', 'NER after'],
    ['NER_BEFORE', 'NER before'],
    ['NER_NEAREST_BEFORE', 'nearst NER before'],
    ['NER_NEAREST_AFTER', 'nearest NER after'],
    ['NER_ADJACENT_BEFORE', 'adjacent NER before'],
    ['NER_ADJACENT_AFTER', 'adjacent NER after'],
    ['NPB', 'Noun Phrase before'],
    ['NNPB', 'nearest Noun Phrase before '],
    ['NNPA', 'nearest Noun Phrase after'],
    ['NPIA', 'Noun Phrase immediate after'],
    ['NPIB', 'Noun Phrase immediately before'],
    ['NPC', 'Noun Phrase contained in'],
    ['NPA', 'Noun Phrase after'],
    ['NNB', 'Noun Phrase before'],
    ['NNA', 'nearest Noun after'],
    ['NVB', 'nearest verb before'],
    ['NVA', 'Verb Phrase after'],
    ['VPB', 'Verb Phrase before'],
    ['NVPB', 'nearest Verb Phrase before'],
    ['VPIB', 'Verb Phrase immediately before'],
    ['VPIA', 'Verb Phrase immediately after'],
    ['NVPA', 'nearest Verb Phrase after'],
    ['VPA', 'Verb Phrase after'],
    ['MOD', 'Modifier'],
    ['EB', 'Entity before'],
    ['EA', 'Entity after'],
    ['NEAREST_NER_PAIR', 'Pair of nearest NERs (before and after)'],
    ['NEAREST_POS_PAIR', 'Pair of nearest POSs (before and after)']
];

var schemaDep = [
    ['DepWithLabels', 'Dependant (with label)'],
    ['DepN', 'Dependant Noun'],
    ['DepN_WITH_LABELS', 'Dependant Noun (with label)'],
    ['DepNP', 'Dependant Noun Phrase'],
    ['DepNP_WITH_LABELS', 'Dependant Noun Phrase (with label)'],
    ['DepV', 'Dependant Verb'],
    ['DepV_WITH_LABELS', 'Dependant Verb (with label)'],
    ['DepVP', 'Dependant Verb Phrase'],
    ['DepVP_WITH_LABELS', 'Dependant Verb Phrase (with label)'],
    ['DepM', 'Dependant Mention'],
    ['DepM_WITH_LABELS', 'Dependant Mention (with label)'],
    ['DepNER', 'Dependant NER'],
    ['DepNER_WITH_LABELS', 'Dependant NER (with label)'],
    ['DEP_COREF', 'Dependant co-referred word'],
    ['DEP_COREF_WITH_PATH_BASED_LABELS', 'Dependant co-referred word (with labels)']
];

var tripleSchema = [
    ['TRIPLE_BEFORE', 'triple before'],
    ['TRIPLE_AFTER', 'triple after'],
    ['TRIPLE_BEFORE_NER_LABEL', 'triple before (NER labels)'],
    ['TRIPLE_AFTER_NER_LABEL', 'triple after (NER labels)'],
    ['TRIPLE_BEFORE_WITH_COREF_LINK_SUBJ_SUBJ_NO_AGGREGATION', 'triple before with coref between subj-subj'],
    ['TRIPLE_AFTER_WITH_COREF_LINK_SUBJ_SUBJ_NO_AGGREGATION', 'triple after with coref between subj-subj'],
    ['TRIPLE_BEFORE_WITH_COREF_LINK_SUBJ_OBJ_NO_AGGREGATION', 'triple before with coref between subj-obj'],
    ['TRIPLE_AFTER_WITH_COREF_LINK_SUBJ_OBJ_NO_AGGREGATION', 'triple after with coref between subj-obj'],
    ['TRIPLE_BEFORE_WITH_COREF_LINK_OBJ_SUBJ_NO_AGGREGATION', 'triple before with coref between obj-subj'],
    ['TRIPLE_AFTER_WITH_COREF_LINK_OBJ_SUBJ_NO_AGGREGATION', 'triple after with coref between obj-subj'],
    ['TRIPLE_BEFORE_WITH_COREF_LINK_OBJ_OBJ_NO_AGGREGATION', 'triple before with coref between obj-obj'],
    ['TRIPLE_AFTER_WITH_COREF_LINK_OBJ_OBJ_NO_AGGREGATION', 'triple after with coref between obj-obj'],
    ['TRIPLE_BEFORE_WITH_COREF_LINK_SUBJ_SUBJ_REMOVE_COREFED_ELEMENT', 'triple before with coref between subj-subj'],
    ['TRIPLE_AFTER_WITH_COREF_LINK_SUBJ_SUBJ_REMOVE_COREFED_ELEMENT', ''],
    ['TRIPLE_BEFORE_WITH_COREF_LINK_SUBJ_OBJ_REMOVE_COREFED_ELEMENT', ''],
    ['TRIPLE_AFTER_WITH_COREF_LINK_SUBJ_OBJ_REMOVE_COREFED_ELEMENT', ''],
    ['TRIPLE_BEFORE_WITH_COREF_LINK_OBJ_SUBJ_REMOVE_COREFED_ELEMENT', ''],
    ['TRIPLE_AFTER_WITH_COREF_LINK_OBJ_SUBJ_REMOVE_COREFED_ELEMENT', ''],
    ['TRIPLE_BEFORE_WITH_COREF_LINK_OBJ_OBJ_REMOVE_COREFED_ELEMENT', ''],
    ['TRIPLE_AFTER_WITH_COREF_LINK_OBJ_OBJ_REMOVE_COREFED_ELEMENT', ''],
    ['TRIPLE_BEFORE_WITH_COREF_LINK_SUBJ_SUBJ_REMOVE_BOTH', ''],
    ['TRIPLE_AFTER_WITH_COREF_LINK_SUBJ_SUBJ_REMOVE_BOTH', ''],
    ['TRIPLE_BEFORE_WITH_COREF_LINK_SUBJ_OBJ_REMOVE_BOTH', ''],
    ['TRIPLE_AFTER_WITH_COREF_LINK_SUBJ_OBJ_REMOVE_BOTH', ''],
    ['TRIPLE_BEFORE_WITH_COREF_LINK_OBJ_SUBJ_REMOVE_BOTH', ''],
    ['TRIPLE_AFTER_WITH_COREF_LINK_OBJ_SUBJ_REMOVE_BOTH', ''],
    ['TRIPLE_BEFORE_WITH_COREF_LINK_OBJ_OBJ_REMOVE_BOTH', ''],
    ['TRIPLE_AFTER_WITH_COREF_LINK_OBJ_OBJ_REMOVE_BOTH', ''],
    ['TRIPLE_BEFORE_WITH_COREF_LINK_WITH_CONNECTIVE_SUBJ_SUBJ_NO_AGGREGATION', ''],
    ['TRIPLE_AFTER_WITH_COREF_LINK_WITH_CONNECTIVE_SUBJ_SUBJ_NO_AGGREGATION', ''],
    ['TRIPLE_BEFORE_WITH_COREF_LINK_WITH_CONNECTIVEE_OBJ_SUBJ_NO_AGGREGATION', ''],
    ['TRIPLE_AFTER_WITH_COREF_LINK_WITH_CONNECTIVE_OBJ_SUBJ_NO_AGGREGATION', ''],
    ['TRIPLE_BEFORE_WITH_COREF_LINK_WITH_CONNECTIVE_SUBJ_OBJ_NO_AGGREGATION', ''],
    ['TRIPLE_AFTER_WITH_COREF_LINK_WITH_CONNECTIVE_SUBJ_OBJ_NO_AGGREGATION', ''],
    ['TRIPLE_BEFORE_WITH_COREF_LINK_WITH_CONNECTIVE_OBJ_OBJ_NO_AGGREGATION', ''],
    ['TRIPLE_AFTER_WITH_COREF_LINK_WITH_CONNECTIVE_OBJ_OBJ_NO_AGGREGATION', ''],
    ['TRIPLE_BEFORE_WITH_COREF_LINK_WITH_CONNECTIVE_SUBJ_SUBJ_REMOVE_COREFED_ELEMENT', ''],
    ['TRIPLE_AFTER_WITH_COREF_LINK_WITH_CONNECTIVE_SUBJ_SUBJ_REMOVE_COREFED_ELEMENT', ''],
    ['TRIPLE_BEFORE_WITH_COREF_LINK_WITH_CONNECTIVEE_OBJ_SUBJ_REMOVE_COREFED_ELEMENT', ''],
    ['TRIPLE_AFTER_WITH_COREF_LINK_WITH_CONNECTIVE_OBJ_SUBJ_REMOVE_COREFED_ELEMENT', ''],
    ['TRIPLE_BEFORE_WITH_COREF_LINK_WITH_CONNECTIVE_SUBJ_OBJ_REMOVE_COREFED_ELEMENT', ''],
    ['TRIPLE_AFTER_WITH_COREF_LINK_WITH_CONNECTIVE_SUBJ_OBJ_REMOVE_COREFED_ELEMENT', ''],
    ['TRIPLE_BEFORE_WITH_COREF_LINK_WITH_CONNECTIVE_OBJ_OBJ_REMOVE_COREFED_ELEMENT', ''],
    ['TRIPLE_AFTER_WITH_COREF_LINK_WITH_CONNECTIVE_OBJ_OBJ_REMOVE_COREFED_ELEMENT', ''],
    ['TRIPLE_BEFORE_WITH_COREF_LINK_WITH_CONNECTIVE_SUBJ_SUBJ_REMOVE_BOTH', ''],
    ['TRIPLE_AFTER_WITH_COREF_LINK_WITH_CONNECTIVE_SUBJ_SUBJ_REMOVE_BOTH', ''],
    ['TRIPLE_BEFORE_WITH_COREF_LINK_WITH_CONNECTIVEE_OBJ_SUBJ_REMOVE_BOTH', ''],
    ['TRIPLE_AFTER_WITH_COREF_LINK_WITH_CONNECTIVE_OBJ_SUBJ_REMOVE_BOTH', ''],
    ['TRIPLE_BEFORE_WITH_COREF_LINK_WITH_CONNECTIVE_SUBJ_OBJ_REMOVE_BOTH', ''],
    ['TRIPLE_AFTER_WITH_COREF_LINK_WITH_CONNECTIVE_SUBJ_OBJ_REMOVE_BOTH', ''],
    ['TRIPLE_BEFORE_WITH_COREF_LINK_WITH_CONNECTIVE_OBJ_OBJ_REMOVE_BOTH', ''],
    ['TRIPLE_AFTER_WITH_COREF_LINK_WITH_CONNECTIVE_OBJ_OBJ_REMOVE_BOTH', '']
];

class ProfilerVisualizer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // panel
            panelState: 1,
            helpContent: helpGloabl,
            aboutContent: aboutGlobal,

            // results of query
            queryResult: "",

            // query information
            profilerType: 0,
            schemaType: 1,
            surfacePlaceHolder: 'Enter a Verb',
            labelPlaceHolder: 'Label (Verb Sense)',
            surfaceString: '',
            labelString: '',
            maxItemsPerTable: 20,

            // quadruple
            quadrupleAttribute: 0,
            quadrupleRole: 0,
            queryResultQuadruple: "",
            quadrupleExplanation: '',

            // triple
            tripleAttribute: 0,
            tripleRole: 0,
            queryResultTriple: "",
            tripleExplanation: '',

            // pairwise
            pairwiseAttribute: 0,
            pairwiseRole: 0,
            queryResultPairwise: "",
            pairwiseExplanation: '',

            // 6 tuple
            sixTupleAttribute: 0,
            sixTupleRole: 0,
            queryResultsixTuple: "",
            sixTupleExplanation: '',
            p1_a1_role: 0, // these are for the order of subj and obj
            p1_a2_role: 1,
            p2_a1_role: 0,
            p2_a2_role: 1,
            p1_a1_att: 0, // these are for aggregation
            p1_a2_att: 0,
            p2_a1_att: 0,
            p2_a2_att: 0,
            sixTupleAggregation: 'np',
            sixTuplePredRole: 0
        };
    }

    queryHandle(queryType, conceptGraphType) {
        console.log('conceptGraphType = ' + conceptGraphType);
        this.setState({loading: true});
        console.log(this.state.surfaceString);
        console.log(this.state.labelString);

        this.setState({loading: true});
        console.log(this.state.surfaceString);
        console.log(this.state.labelString);

        var self = this;
        Qwest.get('/api/hello', {
            surface: this.state.surfaceString,
            label: this.state.labelString,
            entityType: this.state.profilerType,
            queryType: queryType
        }, {timeout: 50000, responseType: 'json'}).then(function (response) {
                console.log('response.text = ' + response.text);
                console.log('response = ' + JSON.parse(response.text));
                //self.setState({queryResult: JSON.parse(response.text)});

                if (conceptGraphType === 0)
                    self.setState({queryResultPairwise: JSON.parse(response.text)});
                else if (conceptGraphType === 1)
                    self.setState({queryResultTriple: JSON.parse(response.text)});
                else if (conceptGraphType === 2)
                    self.setState({queryResultQuadruple: JSON.parse(response.text)});
                else if (conceptGraphType === 3)
                    self.setState({queryResultsixTuple: JSON.parse(response.text)});

                //console.log('result of log : ' + self.state.queryResult);
                //console.log(this.state.loading);
            }.bind(this)
        );
    }

    ShowARowOfTable(row) {
        var rows = [];
        var self = this;
        if (Array.isArray(row)) {
            row.forEach(function (tableCell, i) {

                rows.push(
                    <td key={i}>
                        {tableCell}
                    </td>
                );
            });
        }
        return rows;
    }

    sortMapByValue(map) {
        var tupleArray = [];
        for (var key in map) tupleArray.push([key, map[key]]);
        tupleArray.sort(function (a, b) {
            return b[1] - a[1]
        });
        var sortedMap = {};
        tupleArray.forEach(function (el) {
            sortedMap[el[0]] = el[1]
        });
        return sortedMap;
    }

    ShowATable(schemaName, queryType) {
        console.log('queryType = ' + queryType);
        var qResult;
        if (queryType === 0)
            qResult = this.state.queryResultPairwise;
        else if (queryType === 1)
            qResult = this.state.queryResultTriple;
        else if (queryType === 2)
            qResult = this.state.queryResultQuadruple;
        else if (queryType === 3)
            qResult = this.state.queryResultsixTuple;

        console.log('ShowATable: qResult = ' + qResult);

        //if ( Array.isArray(this.state.queryResult) && schemaName in this.state.queryResult[0].counts ) {
        //  var tableContent1 = this.state.queryResult[0].counts[schemaName];
        if (Array.isArray(qResult) && schemaName in qResult[0].counts) {
            var tableContent1 = qResult[0].counts[schemaName];
            console.log("schemaName = " + schemaName);
            console.log("tableContent1 = " + tableContent1);
            var tableContent = this.sortMapByValue(tableContent1);
            var resultAll = Object.keys(tableContent);
            var countNums = resultAll.map(function (keyElement) {
                return tableContent[keyElement]
            });
            var titles = Object.keys(JSON.parse(resultAll[0]));
            var contents = [];
            for (var i = 0; i < this.state.maxItemsPerTable && i < resultAll.length; i++) {
                // console.log("i = " + i);
                var rowMap = JSON.parse(resultAll[i]);
                var oneRow = titles.map(function (titleElement) {
                    return rowMap[titleElement]
                });
                oneRow.push(countNums[i]); // the frequency of the element
                contents.push(oneRow);
            }
            console.log('length of contents = ');
            console.log(contents.length);
            console.log(contents);
            titles.push("Frequency");

            var rows = [];
            var self = this;
            var title = <thead>
            <tr key="0"> {self.ShowARowOfTable(titles)} </tr>
            </thead>;
            rows.push(title);

            var bodyRows = [];
            if (Array.isArray(contents)) {
                contents.forEach(function (row, i) {
                    var goo = <tr key={i + 1}>{self.ShowARowOfTable(row)}</tr>;
                    bodyRows.push(goo);
                });
                rows.push(<tbody>{bodyRows}</tbody>)
            }
        }
        var Table = require('react-bootstrap').Table;
        return (<Table striped bordered condensed hover>{rows}</Table> );
    }

    ShowASimpleTable(schemaName, queryType) {
        var rows = [];
        var qResult;
        if (queryType === 0)
            qResult = this.state.queryResultPairwise;
        else if (queryType === 1)
            qResult = this.state.queryResultTriple;
        else if (queryType === 2)
            qResult = this.state.queryResultQuadruple;
        else if (queryType === 3)
            qResult = this.state.queryResultsixTuple;

        console.log('ShowASimpleTable: qResult = ' + qResult);

        //if ( Array.isArray(this.state.queryResult) && schemaName in this.state.queryResult[0].counts ) {
        //  var tableContent1 = this.state.queryResult[0].counts[schemaName];
        if (Array.isArray(qResult) && schemaName in qResult[0].counts) {
            var tableContent1 = qResult[0].counts[schemaName];
            var tableContent = this.sortMapByValue(tableContent1);
            var titles = ['Attribute', 'Frequency'];

            var self = this;
            var title = <thead>
            <tr key="0"> {self.ShowARowOfTable(titles)} </tr>
            </thead>;
            rows.push(title);

            var contents = Object.keys(tableContent).slice(0, this.state.maxItemsPerTable).map(function (key) {
                return [key, tableContent[key]]
            });

            console.log("Size of contents = " + contents.length);
            console.log(contents);

            var bodyRows = [];
            if (Array.isArray(contents)) {
                contents.forEach(function (row, i) {
                    //console.log('Inside forEach: i = ' + i);
                    var goo = <tr key={i + 1}>{self.ShowARowOfTable(row)}</tr>;
                    bodyRows.push(goo);
                });
                rows.push(<tbody>{bodyRows}</tbody>)
            }
            console.log('title = ' + title);
            console.log('bodyRows = ' + bodyRows);
        }
        //rows.push(<thead> <tr> <td> 2 </td> </tr> </thead>);
        //rows.push(<tbody> <tr> <td> 1 </td> </tr> </tbody>);
        //console.log(rows);
        var Table = require('react-bootstrap').Table;
        return (<Table striped bordered condensed hover>{rows}</Table> );
    }

    handleSchemaTypeChange(key) {
        //console.log("aasdasd");
        this.setState({profilerType: key});
        //console.log(this.state.profilerType);
        this.queryView();
    }

    handleSelectPanel(key) {
        this.setState({panelState: key});
        //if (key == 1) {
        //    this.queryView();
        //    this.setState({
        //        panelState: 1,
        //        panelContent: '',
        //        panelTitle: 'Query'
        //    });
        //}
        //else if (key == 2) {
        //    this.setState({
        //        panelState: 2,
        //        panelContent: this.state.helpContent,
        //        panelTitle: 'Help'
        //    });
        //}
        //else {
        //    this.setState({panelContent: this.state.aboutContent, panelTitle: 'About'});
        //}
    }

    getRoleList(_role, type, id) {
        var MenuItem = require('react-bootstrap').MenuItem;
        var DropdownButton = require('react-bootstrap').DropdownButton;

        var _items = _role.map(function (role, i) {
            return ( <MenuItem eventKey={i}>{role}</MenuItem> );
        });
        return (
            <DropdownButton ref='roleType' bsStyle='link' title='Role' key='1' bsSize='xsmall'
                            onSelect={this.handleSelectRoleList.bind(this, type, id)}>
                {_items}
            </DropdownButton>
        );
    }

    getAttributeList(_att, type, id) {
        var MenuItem = require('react-bootstrap').MenuItem;
        var DropdownButton = require('react-bootstrap').DropdownButton;
        var _items = _att.map(function (att, i) {
            return ( <MenuItem eventKey={i}>{att}</MenuItem> );
        });
        return (
            <DropdownButton bsStyle='primary' title='Attribute' key='1' bsSize='xsmall'
                            onSelect={this.handleSelectAttributeList.bind(this,type, id)}>
                {_items}
            </DropdownButton>
        );
    }

    handleSelectRoleList(type, id, key) {
        console.log('inside handleSelectRoleList');
        console.log(key);
        console.log('type = ' + type);
        if (type === 0)
            this.setState({pairwiseRole: key});
        else if (type === 1)
            this.setState({tripleRole: key});
        else if (type === 2)
            this.setState({quadrupleRole: key});
        else if (type === 3) {
            if (id === 0)
                this.setState({p1_a1_role: key, p1_a2_role: 1 - key});
            else if (id === 1)
                this.setState({p1_a1_role: 1 - key, p1_a2_role: key});
            else if (id === 2)
                this.setState({p2_a1_role: key, p2_a2_role: 1 - key});
            else if (id === 3)
                this.setState({p2_a1_role: 1 - key, p2_a2_role: key});
            else if (id === 4)
                this.setState({sixTuplePredRole: key});
        }
    }

    handleSelectAttributeList(type, id, key) {
        console.log('inside handleSelectAttributeList');
        console.log(key);
        console.log('type = ' + type);
        if (type === 0)
            this.setState({pairwiseAttribute: key});
        else if (type === 1)
            this.setState({tripleAttribute: key});
        else if (type === 2)
            this.setState({quadrupleAttribute: key});
        else if (type === 3) {
            // no aggregation
            if (key == 0) {
                this.setState({
                    p1_a1_att: 0,
                    p1_a2_att: 0,
                    p2_a1_att: 0,
                    p2_a2_att: 0,
                    sixTupleAggregation: triple_aggregation_types[0]
                });
            }
            else if (key == 1) {
                if (id === 0 || id === 3) { // both
                    this.setState({
                        p1_a1_att: 1,
                        p1_a2_att: 1,
                        p2_a1_att: 1,
                        p2_a2_att: 1,
                        sixTupleAggregation: triple_aggregation_types[2]
                    });
                }
                else if (id === 1 || id === 2) {
                    if (this.state.p1_a1_att == 0) // only co-referred
                        this.setState({
                            p1_a1_att: 1,
                            p2_a1_att: 1,
                            sixTupleAggregation: triple_aggregation_types[1]
                        });
                    else // both
                        this.setState({
                            p1_a1_att: 1,
                            p1_a2_att: 1,
                            p2_a1_att: 1,
                            p2_a2_att: 1,
                            sixTupleAggregation: triple_aggregation_types[2]
                        });
                }
            }
        }
    }

    entityClicked() {
        this.setState({
            surfacePlaceHolder: 'Enter an Entity',
            labelPlaceHolder: 'Label (Wiki link)',
            profilerType: 1
        });
    }

    verbClicked() {
        this.setState({
            surfacePlaceHolder: 'Enter a Verb',
            labelPlaceHolder: 'Label (Verb Sense)',
            profilerType: 0
        });
    }

    getQueryList(self, isWikiDisabled) {
        var MenuItem = require('react-bootstrap').MenuItem;
        var DropdownButton = require('react-bootstrap').DropdownButton;
        var Input = require('react-bootstrap').Input;
        var ButtonToolbar = require('react-bootstrap').ButtonToolbar;
        var Button = require('react-bootstrap').Button;
        var ButtonGroup = require('react-bootstrap').ButtonGroup;

        var isVerbActive = '';
        var isWikiActive = '';
        if (this.state.profilerType == 0) {
            isVerbActive = 'active';
            isWikiActive = '';
        }
        else {
            isWikiActive = 'active';
            isVerbActive = '';
        }
        var wikiDisabled = '';
        if (isWikiDisabled)
            wikiDisabled = 'disabled';

        return (
            <DropdownButton bsStyle='danger' title='Attribute' key='1' bsSize='xsmall'>
                <MenuItem eventKey='1'>
                    <ButtonToolbar>
                        <ButtonGroup bsSize='xsmall'>
                            <Button key='1' eventKey='1'
                                    onClick={this.verbClicked.bind(this)}>Verb</Button>
                            <Button key='2' eventKey='2' onClick={this.entityClicked.bind(this)}>Wiki
                                Entity</Button>
                        </ButtonGroup>
                    </ButtonToolbar>
                    <Input type='text' className='input-sm'
                           onChange={this.updateSurfaceHandle.bind(this)}
                           placeholder={this.state.surfacePlaceHolder}/>
                    <Input type='text' className='input-sm'
                           onChange={this.updateLabelHandle.bind(this)}
                           placeholder={this.state.labelPlaceHolder}/>
                </MenuItem>
            </DropdownButton>
        );
    }

    updateSurfaceHandle(e) {
        this.setState({surfaceString: e.target.value});
    }

    updateLabelHandle(e) {
        this.setState({labelString: e.target.value});
    }

    showPairwiseSchema() {
        //console.log('this.state.pairwiseAttribute = ' + this.state.pairwiseAttribute);
        //console.log('this.state.pairwiseRole = ' + this.state.pairwiseRole);

        var att = attributes[this.state.pairwiseAttribute];
        var role = role_pairwise[this.state.pairwiseRole];
        //console.log('att = ' + att);
        //console.log('role = ' + role);

        var schema = '';
        var schemaSimple = '';

        if (role === 'same span' && att === 'NER')
            schemaSimple = 'NER_SAME_SPAN';
        else if (role === 'after' && att === 'NER')
            schemaSimple = 'NER_AFTER';
        else if (role === 'before' && att === 'NER')
            schemaSimple = 'NER_BEFORE';
        else if (role === 'nearest before' && att === 'NER')
            schemaSimple = 'NER_NEAREST_BEFORE';
        else if (role === 'nearest after' && att === 'NER')
            schemaSimple = 'NER_NEAREST_AFTER';
        else if (role === 'adjacent before' && att === 'NER')
            schemaSimple = 'NER_ADJACENT_BEFORE';
        else if (role === 'adjacent after' && att === 'NER')
            schemaSimple = 'NER_ADJACENT_AFTER';
        else if (role === 'before' && att === 'Noun Phrase')
            schemaSimple = 'NPB';
        else if (role === 'nearest before' && att === 'Noun Phrase')
            schemaSimple = 'NNPB';
        else if (role === 'nearest after' && att === 'Noun Phrase')
            schemaSimple = 'NNPA';
        else if (role === 'immediately after' && att === 'Noun Phrase')
            schemaSimple = 'NPIA';
        else if (role === 'immediately before' && att === 'Noun Phrase')
            schemaSimple = 'NPIB';
        else if (role === 'contained in' && att === 'Noun Phrase')
            schemaSimple = 'NPC';
        else if (role === 'after' && att === 'Noun Phrase')
            schemaSimple = 'NPA';
        else if (role === 'before' && att === 'Noun Phrase')
            schemaSimple = 'NPB';
        else if (role === 'nearest before' && att === 'Noun')
            schemaSimple = 'NNB';
        else if (role === 'nearest after' && att === 'Noun')
            schemaSimple = 'NNA';
        else if (role === 'after' && att === 'Verb Phrase')
            schemaSimple = 'VPA';
        else if (role === 'before' && att === 'Verb Phrase')
            schemaSimple = 'VPB';
        else if (role === 'nearest after' && att === 'Verb Phrase')
            schemaSimple = 'NVPA';
        else if (role === 'nearest before' && att === 'Verb Phrase')
            schemaSimple = 'NVPB';
        else if (role === 'immediately before' && att === 'Verb Phrase')
            schemaSimple = 'VPIB';
        else if (role === 'immediately after' && att === 'Verb Phrase')
            schemaSimple = 'VPIA';
        else if (role === 'nearest after' && att === 'Verb Phrase')
            schemaSimple = 'NVPA';
        else if (role === 'after' && att === 'Verb Phrase')
            schemaSimple = 'VPA';
        else if (role === 'after' && att === 'Entity')
            schema = 'EA';
        else if (role === 'before' && att === 'Entity')
            schema = 'EB';

//  Dependency
        else if (role === 'dependency' && att === 'Noun')
            schema = 'DepN';
        else if (role === 'dependency' && att === 'Noun Phrase')
            schema = 'DepNP';
        else if (role === 'dependency' && att === 'Verb')
            schema = 'DepV';
        else if (role === 'dependency' && att === 'Modifier')
            schema = 'DepM';
        else if (role === 'dependency' && att === 'NER')
            schema = 'DepNER_WITH_LABELS';
        else if (role === 'dependency' && att === 'Raw Text')
            schema = 'DepLabel';

        //<h1>Nearest Noun After </h1>
        //{this.ShowASimpleTable('NNA')}
        //<h1> NER_AFTER1  </h1>
        //{this.ShowASimpleTable('NER_AFTER')}
        //<h1> Entity After </h1>
        //{this.ShowATable('EA', true)};
        //<h1> Entity Before </h1>
        //{this.ShowATable('EB', true)}
        //schema = 'NPA';

        var output = '';
        if (schema != '')
            output = this.ShowATable(schema, 0);
        if (schemaSimple != '')
            output = this.ShowASimpleTable(schemaSimple, 0);
        return (
            <div>
                {output}
            </div>
        );
    }

    showTripleSchema() {
        console.log('Triple: this.state.pairwiseAttribute = ' + this.state.tripleAttribute);

        var triple_att = ['POS', 'NER'];
        var att = triple_att[this.state.tripleAttribute];
        console.log('Triple: att = ' + att);

        var schema = '';
        var schemaSimple = '';

        if (att === 'NER')
            schema = 'NEAREST_NER_PAIR';
        else if (att === 'POS')
            schema = 'NEAREST_POS_PAIR';

        console.log('TRIPLE: schema = ' + schema);
        console.log('TRIPLE: schemaSimple = ' + schemaSimple);

        var output = '';
        if (schema != '')
            output = this.ShowATable(schema, 1);
        if (schemaSimple != '')
            output = this.ShowASimpleTable(schemaSimple, 1);
        return (
            <div>
                {output}
            </div>
        );
    }

    showQuadrupleSchema() {
        console.log('Triple: this.state.pairwiseAttribute = ' + this.state.quadrupleAttribute);

        var quadruple_att = ['Dep Label', 'Aggregate'];
        var att = quadruple_att[this.state.quadrupleAttribute];
        console.log('Quadruple: att = ' + att);

        var schema = '';
        var schemaSimple = '';

        if (att === 'Dep Label')
            schema = 'DEP_COREF';
        else if (att === 'Aggregate')
            schema = 'DEP_COREF_WITH_PATH_BASED_LABELS';

        console.log('Quadruple: schema = ' + schema);
        console.log('Quadruple: schemaSimple = ' + schemaSimple);

        var output = '';
        if (schema != '')
            output = this.ShowATable(schema, 2);
        if (schemaSimple != '')
            output = this.ShowASimpleTable(schemaSimple, 2);
        return (
            <div>
                {output}
            </div>
        );
    }


    showSixTupleSchema() {
        console.log('Triple: this.state.sixTupleAttribute = ' + this.state.sixTupleAttribute);

        var quadruple_att = ['Dep Label', 'Aggregate'];
        var att = quadruple_att[this.state.quadrupleAttribute];
        console.log('Quadruple: att = ' + att);


        var pred_role = triple_roles[0];
        var p1_a2 = this.state.p1_a2_role;
        var p2_a1 = this.state.p2_a1_role;
        var aggregation = this.state.sixTupleAggregation;
        var schema = '';
        var schemaSimple = '';

        if (pred_role === 'After')
            schema = 'TRIPLE_AFTER';
        else if (pred_role === 'Before')
            schema = 'TRIPLE_BEFORE';

        // no aggregation
        else if (pred_role === 'Co-referred before' && p1_a2 === 'Subj' && p2_a1 === 'Subj' && aggregation === 'no')
            schema = 'TRIPLE_BEFORE_WITH_COREF_LINK_SUBJ_SUBJ_NO_AGGREGATION';
        else if (pred_role === 'Co-referred after' && p1_a2 === 'Subj' && p2_a1 === 'Subj' && aggregation === 'no')
            schema = 'TRIPLE_AFTER_WITH_COREF_LINK_SUBJ_SUBJ_NO_AGGREGATION';
        else if (pred_role === 'Co-referred before' && p1_a2 === 'Subj' && p2_a1 === 'Obj' && aggregation === 'no')
            schema = 'TRIPLE_BEFORE_WITH_COREF_LINK_SUBJ_OBJ_NO_AGGREGATION';
        else if (pred_role === 'Co-referred after' && p1_a2 === 'Subj' && p2_a1 === 'Obj' && aggregation === 'no')
            schema = 'TRIPLE_AFTER_WITH_COREF_LINK_SUBJ_OBJ_NO_AGGREGATION';
        else if (pred_role === 'Co-referred before' && p1_a2 === 'Obj' && p2_a1 === 'Subj' && aggregation === 'no')
            schema = 'TRIPLE_BEFORE_WITH_COREF_LINK_OBJ_SUBJ_NO_AGGREGATION';
        else if (pred_role === 'Co-referred after' && p1_a2 === 'Obj' && p2_a1 === 'Subj' && aggregation === 'no')
            schema = 'TRIPLE_AFTER_WITH_COREF_LINK_OBJ_SUBJ_NO_AGGREGATION';
        else if (pred_role === 'Co-referred before' && p1_a2 === 'Obj' && p2_a1 === 'Obj' && aggregation === 'no')
            schema = 'TRIPLE_BEFORE_WITH_COREF_LINK_OBJ_OBJ_NO_AGGREGATION';
        else if (pred_role === 'Co-referred after' && p1_a2 === 'Obj' && p2_a1 === 'Obj' && aggregation === 'no')
            schema = 'TRIPLE_AFTER_WITH_COREF_LINK_OBJ_OBJ_NO_AGGREGATION';

        // aggregation: only co-reffed
        else if (pred_role === 'Co-referred before' && p1_a2 === 'Subj' && p2_a1 === 'Subj' && aggregation === 'co-referred-element')
            schema = 'TRIPLE_BEFORE_WITH_COREF_LINK_SUBJ_SUBJ_REMOVE_COREFED_ELEMENT';
        else if (pred_role === 'Co-referred after' && p1_a2 === 'Subj' && p2_a1 === 'Subj' && aggregation === 'co-referred-element')
            schema = 'TRIPLE_AFTER_WITH_COREF_LINK_SUBJ_SUBJ_REMOVE_COREFED_ELEMENT';
        else if (pred_role === 'Co-referred before' && p1_a2 === 'Subj' && p2_a1 === 'Obj' && aggregation === 'co-referred-element')
            schema = 'TRIPLE_BEFORE_WITH_COREF_LINK_SUBJ_OBJ_REMOVE_COREFED_ELEMENT';
        else if (pred_role === 'Co-referred after' && p1_a2 === 'Subj' && p2_a1 === 'Obj' && aggregation === 'co-referred-element')
            schema = 'TRIPLE_AFTER_WITH_COREF_LINK_SUBJ_OBJ_REMOVE_COREFED_ELEMENT';
        else if (pred_role === 'Co-referred before' && p1_a2 === 'Obj' && p2_a1 === 'Subj' && aggregation === 'co-referred-element')
            schema = 'TRIPLE_BEFORE_WITH_COREF_LINK_OBJ_SUBJ_REMOVE_COREFED_ELEMENT';
        else if (pred_role === 'Co-referred after' && p1_a2 === 'Obj' && p2_a1 === 'Subj' && aggregation === 'co-referred-element')
            schema = 'TRIPLE_AFTER_WITH_COREF_LINK_OBJ_SUBJ_REMOVE_COREFED_ELEMENT';
        else if (pred_role === 'Co-referred before' && p1_a2 === 'Obj' && p2_a1 === 'Obj' && aggregation === 'co-referred-element')
            schema = 'TRIPLE_BEFORE_WITH_COREF_LINK_OBJ_OBJ_REMOVE_COREFED_ELEMENT';
        else if (pred_role === 'Co-referred after' && p1_a2 === 'Obj' && p2_a1 === 'Obj' && aggregation === 'co-referred-element')
            schema = 'TRIPLE_AFTER_WITH_COREF_LINK_OBJ_OBJ_REMOVE_COREFED_ELEMENT';

        // aggregation: both
        else if (pred_role === 'Co-referred before' && p1_a2 === 'Subj' && p2_a1 === 'Subj' && aggregation === 'both')
            schema = 'TRIPLE_BEFORE_WITH_COREF_LINK_SUBJ_SUBJ_REMOVE_BOTH';
        else if (pred_role === 'Co-referred after' && p1_a2 === 'Subj' && p2_a1 === 'Subj' && aggregation === 'both')
            schema = 'TRIPLE_AFTER_WITH_COREF_LINK_SUBJ_SUBJ_REMOVE_BOTH';
        else if (pred_role === 'Co-referred before' && p1_a2 === 'Subj' && p2_a1 === 'Obj' && aggregation === 'both')
            schema = 'TRIPLE_BEFORE_WITH_COREF_LINK_SUBJ_OBJ_REMOVE_BOTH';
        else if (pred_role === 'Co-referred after' && p1_a2 === 'Subj' && p2_a1 === 'Obj' && aggregation === 'both')
            schema = 'TRIPLE_AFTER_WITH_COREF_LINK_SUBJ_OBJ_REMOVE_BOTH';
        else if (pred_role === 'Co-referred before' && p1_a2 === 'Obj' && p2_a1 === 'Subj' && aggregation === 'both')
            schema = 'TRIPLE_BEFORE_WITH_COREF_LINK_OBJ_SUBJ_REMOVE_BOTH';
        else if (pred_role === 'Co-referred after' && p1_a2 === 'Obj' && p2_a1 === 'Subj' && aggregation === 'both')
            schema = 'TRIPLE_AFTER_WITH_COREF_LINK_OBJ_SUBJ_REMOVE_BOTH';
        else if (pred_role === 'Co-referred before' && p1_a2 === 'Obj' && p2_a1 === 'Obj' && aggregation === 'both')
            schema = 'TRIPLE_BEFORE_WITH_COREF_LINK_OBJ_OBJ_REMOVE_BOTH';
        else if (pred_role === 'Co-referred after' && p1_a2 === 'Obj' && p2_a1 === 'Obj' && aggregation === 'both')
            schema = 'TRIPLE_AFTER_WITH_COREF_LINK_OBJ_OBJ_REMOVE_BOTH';

        console.log('SixTuple: schema = ' + schema);
        console.log('SixTuple: schemaSimple = ' + schemaSimple);

        var output = '';
        if (schema != '')
            output = this.ShowATable(schema, 3);
        if (schemaSimple != '')
            output = this.ShowASimpleTable(schemaSimple, 3);
        return (
            <div>
                {output}
            </div>
        );
    }

//<h1> DepN  </h1>
//{this.ShowASimpleTable('DepN')}
//<h1> DepNP  </h1>
//{this.ShowASimpleTable('DepNP')}
//<h1> DepNER  </h1>
//{this.ShowASimpleTable('DepNER')}
//<h1> DepV  </h1>
//{this.ShowASimpleTable('DepV')}
//<h1> DepVP  </h1>
//{this.ShowASimpleTable('DepVP')}
//<h1> DepM  </h1>
//{this.ShowASimpleTable('DepM')}
//<h1> DepLabel  </h1>
//{this.ShowATable('DepLabel', true)}
//<h1> DepWithLabels  </h1>
//{this.ShowATable('DepWithLabels', true)}
//<h1> DepNER_WITH_LABELS  </h1>
//{this.ShowATable('DepNER_WITH_LABELS', true)}
//<h1> DepN_WITH_LABELS  </h1>
//{this.ShowATable('DepN_WITH_LABELS', true)}
//<h1> DepNP_WITH_LABELS  </h1>
//{this.ShowATable('DepNP_WITH_LABELS', true)}
//<h1> DepV_WITH_LABELS  </h1>
//{this.ShowATable('DepV_WITH_LABELS', true)}
//<h1> DepVP_WITH_LABELS  </h1>
//{this.ShowATable('DepVP_WITH_LABELS', true)}
//<h1> DepM_WITH_LABELS  </h1>
//{this.ShowATable('DepM_WITH_LABELS', true)}
//<h1> DEP_COREF  </h1>
//{this.ShowATable('DEP_COREF', true)}
//<h1> DEP_COREF_WITH_PATH_BASED_LABELS  </h1>
//{this.ShowATable('DEP_COREF_WITH_PATH_BASED_LABELS', true)}

//<h1> TRIPLE_BEFORE  </h1>
//{this.ShowATable('TRIPLE_BEFORE', true)}
//<h1> TRIPLE_AFTER  </h1>
//{this.ShowATable('TRIPLE_AFTER', true)}
//<h1> TRIPLE_BEFORE_NER_LABEL  </h1>
//{this.ShowATable('TRIPLE_BEFORE_NER_LABEL', true)}
//<h1> TRIPLE_AFTER_NER_LABEL  </h1>
//{this.ShowATable('TRIPLE_AFTER_NER_LABEL', true)}
//<h1> TRIPLE_BEFORE_WITH_COREF_LINK_SUBJ_SUBJ_NO_AGGREGATION  </h1>
//{this.ShowATable('TRIPLE_BEFORE_WITH_COREF_LINK_SUBJ_SUBJ_NO_AGGREGATION', true)}
//<h1> TRIPLE_BEFORE_WITH_COREF_LINK_SUBJ_OBJ_NO_AGGREGATION  </h1>
//{this.ShowATable('TRIPLE_BEFORE_WITH_COREF_LINK_SUBJ_OBJ_NO_AGGREGATION', true)}
//<h1> TRIPLE_BEFORE_WITH_COREF_LINK_SUBJ_SUBJ_REMOVE_COREFED_ELEMENT  </h1>
//{this.ShowATable('TRIPLE_BEFORE_WITH_COREF_LINK_SUBJ_SUBJ_REMOVE_COREFED_ELEMENT', true)}
//<h1> TRIPLE_AFTER_WITH_COREF_LINK_SUBJ_SUBJ_REMOVE_COREFED_ELEMENT  </h1>
//{this.ShowATable('TRIPLE_AFTER_WITH_COREF_LINK_SUBJ_SUBJ_REMOVE_COREFED_ELEMENT', true)}
//
//<h1> TRIPLE_BEFORE_WITH_COREF_LINK_SUBJ_SUBJ_REMOVE_BOTH  </h1>
//{this.ShowATable('TRIPLE_BEFORE_WITH_COREF_LINK_SUBJ_SUBJ_REMOVE_BOTH', true)}
//<h1> TRIPLE_AFTER_WITH_COREF_LINK_SUBJ_SUBJ_REMOVE_BOTH  </h1>
//{this.ShowATable('TRIPLE_AFTER_WITH_COREF_LINK_SUBJ_SUBJ_REMOVE_BOTH', true)}
//
//
//<h1> TRIPLE_BEFORE_WITH_COREF_LINK_WITH_CONNECTIVE_SUBJ_SUBJ_NO_AGGREGATION  </h1>
//{this.ShowATable('TRIPLE_BEFORE_WITH_COREF_LINK_WITH_CONNECTIVE_SUBJ_SUBJ_NO_AGGREGATION', true)}
//<h1> TRIPLE_AFTER_WITH_COREF_LINK_WITH_CONNECTIVE_SUBJ_SUBJ_NO_AGGREGATION  </h1>
//{this.ShowATable('TRIPLE_AFTER_WITH_COREF_LINK_WITH_CONNECTIVE_SUBJ_SUBJ_NO_AGGREGATION', true)}
//
//<h1> TRIPLE_AFTER_WITH_COREF_LINK_WITH_CONNECTIVE_SUBJ_SUBJ_REMOVE_COREFED_ELEMENT  </h1>
//{this.ShowATable('TRIPLE_AFTER_WITH_COREF_LINK_WITH_CONNECTIVE_SUBJ_SUBJ_REMOVE_COREFED_ELEMENT', true)}
//<h1> TRIPLE_BEFORE_WITH_COREF_LINK_WITH_CONNECTIVE_SUBJ_SUBJ_REMOVE_COREFED_ELEMENT  </h1>
//{this.ShowATable('TRIPLE_BEFORE_WITH_COREF_LINK_WITH_CONNECTIVE_SUBJ_SUBJ_REMOVE_COREFED_ELEMENT', true)}
//
//<h1> TRIPLE_AFTER_WITH_COREF_LINK_WITH_CONNECTIVE_SUBJ_SUBJ_REMOVE_BOTH  </h1>
//{this.ShowATable('TRIPLE_AFTER_WITH_COREF_LINK_WITH_CONNECTIVE_SUBJ_SUBJ_REMOVE_BOTH', true)}
//<h1> TRIPLE_BEFORE_WITH_COREF_LINK_WITH_CONNECTIVE_SUBJ_SUBJ_REMOVE_BOTH  </h1>
//{this.ShowATable('TRIPLE_BEFORE_WITH_COREF_LINK_WITH_CONNECTIVE_SUBJ_SUBJ_REMOVE_BOTH', true)}


//<h1> TRIPLE_BEFORE  </h1>
//{this.ShowATable('TRIPLE_BEFORE', 3)}
//<h1> TRIPLE_AFTER  </h1>
//{this.ShowATable('TRIPLE_AFTER', 3)}
//<h1> TRIPLE_BEFORE_NER_LABEL  </h1>
//{this.ShowATable('TRIPLE_BEFORE_NER_LABEL', 3)}
//<h1> TRIPLE_AFTER_NER_LABEL  </h1>
//{this.ShowATable('TRIPLE_AFTER_NER_LABEL', 3)}
//<h1> TRIPLE_BEFORE_NER_LABEL  </h1>
//{this.ShowATable('TRIPLE_BEFORE_NER_LABEL', 3)}
//<h1> TRIPLE_AFTER_NER_LABEL  </h1>
//{this.ShowATable('TRIPLE_AFTER_NER_LABEL', 3)}
//<h1> TRIPLE_BEFORE_WITH_COREF_LINK_SUBJ_SUBJ_NO_AGGREGATION  </h1>
//{this.ShowATable('TRIPLE_BEFORE_WITH_COREF_LINK_SUBJ_SUBJ_NO_AGGREGATION', 3)}
//<h1> TRIPLE_BEFORE_WITH_COREF_LINK_SUBJ_OBJ_NO_AGGREGATION  </h1>
//{this.ShowATable('TRIPLE_BEFORE_WITH_COREF_LINK_SUBJ_OBJ_NO_AGGREGATION', 3)}
//<h1> TRIPLE_BEFORE_WITH_COREF_LINK_SUBJ_SUBJ_REMOVE_COREFED_ELEMENT  </h1>
//{this.ShowATable('TRIPLE_BEFORE_WITH_COREF_LINK_SUBJ_SUBJ_REMOVE_COREFED_ELEMENT', 3)}
//<h1> TRIPLE_AFTER_WITH_COREF_LINK_SUBJ_SUBJ_REMOVE_COREFED_ELEMENT  </h1>
//{this.ShowATable('TRIPLE_AFTER_WITH_COREF_LINK_SUBJ_SUBJ_REMOVE_COREFED_ELEMENT', 3)}
//
//<h1> TRIPLE_BEFORE_WITH_COREF_LINK_SUBJ_SUBJ_REMOVE_BOTH  </h1>
//{this.ShowATable('TRIPLE_BEFORE_WITH_COREF_LINK_SUBJ_SUBJ_REMOVE_BOTH', 3)}
//<h1> TRIPLE_AFTER_WITH_COREF_LINK_SUBJ_SUBJ_REMOVE_BOTH  </h1>
//{this.ShowATable('TRIPLE_AFTER_WITH_COREF_LINK_SUBJ_SUBJ_REMOVE_BOTH', 3)}

//<h1> DEP_COREF  </h1>
//{this.ShowATable('DEP_COREF', 2)}
//<h1> DEP_COREF_WITH_PATH_BASED_LABELS  </h1>
//{this.ShowATable('DEP_COREF_WITH_PATH_BASED_LABELS', 2)}

    conceptGraphView() {
        var Button = require('react-bootstrap').Button;
        var ButtonGroup = require('react-bootstrap').ButtonGroup;
        var TabPane = require('react-bootstrap').TabPane;
        var TabbedArea = require('react-bootstrap').TabbedArea;
        var ButtonToolbar = require('react-bootstrap').ButtonToolbar;
        var SplitButton = require('react-bootstrap').SplitButton;
        var MenuItem = require('react-bootstrap').MenuItem;
        var PageHeader = require('react-bootstrap').PageHeader;
        var Panel = require('react-bootstrap').Panel;
        var DropdownButton = require('react-bootstrap').DropdownButton;
        var Input = require('react-bootstrap').Input;

        return (
            <div>
                <Panel>
                    <Panel header="Concept Graph" bsStyle='success'>
                        <div id="pairGraphMain">
                            <div className="tree" id="pairGraph">
                                <ul>
                                    <li>
                      <span className="so-label">
                        {this.getRoleList(role_pairwise, 0)}
                      </span>
                                        {this.getAttributeList(attributes, 0)}
                                    </li>
                                    <li>
                      <span>
                      {this.getQueryList()}
                      </span>
                                    </li>
                                </ul>
                            </div>
                            <Button bsStyle="success" bsSize="small"
                                    onClick={this.queryHandle.bind(this, 0, 0)}>
                                Query
                            </Button>
                        </div>
                        <p id="explanationParagraph">
                            Explanation: {this.state.pairwiseExplanation}
                        </p>
                    </Panel>
                    {this.showPairwiseSchema()}
                </Panel>

                <Panel>
                    <Panel header="Concept Graph" bsStyle='success'>
                        <div id="pairGraphMain">
                            <div className="tree" id="pairGraph">
                                <ul>
                                    <li>
                  <span className="so-label">
                    {this.getRoleList(['before'])}
                  </span>
                                        {this.getAttributeList(['POS', 'NER'], 1)}
                                    </li>
                                    <li>
                                        {this.getQueryList()}
                                    </li>
                                    <li>
                                        {this.getAttributeList(['POS', 'NER'], 1)}
                  <span className="so-label">
                    {this.getRoleList(['after'])}
                  </span>
                                    </li>
                                </ul>
                            </div>
                            <Button bsStyle="success" bsSize="small"
                                    onClick={this.queryHandle.bind(this, 0, 1)}>
                                Query
                            </Button>
                        </div>
                        <p id="explanationParagraph">
                            Explanation: {this.state.tripleExplanation}
                        </p>
                    </Panel>
                    {this.showTripleSchema()}
                </Panel>

                <Panel>
                    <Panel header="Concept Graph" bsStyle='success'>
                        <div id="quadGraphMain">
                            <div className="tree" id="pairGraph">
                                <ul>
                                    <li>
                        <span className="so-label">
                          {this.getRoleList(['Dep'])}
                        </span>
                                        {this.getAttributeList(['Dep Label', 'Aggregate'], 2)}
                                    </li>
                                    <li>
                        <span className="so-label">
                          {this.getRoleList(['Co-reffered'])}
                        </span>
                                        {this.getAttributeList(['Dep Label', 'Aggregate'], 2)}
                                    </li>
                                    <li>
                                        {this.getAttributeList(['Dep Label', 'Aggregate'], 2)}
                        <span className="so-label">
                          {this.getRoleList(['Dep'])}
                        </span>
                                    </li>
                                    <li>
                                        {this.getQueryList()}
                                    </li>
                                </ul>
                            </div>
                            <Button bsStyle="success" bsSize="small"
                                    onClick={this.queryHandle.bind(this, 1, 2)}>
                                Query
                            </Button>
                        </div>
                        <p id="explanationParagraph">
                            Explanation: {this.state.tripleExplanation}
                        </p>
                    </Panel>
                    {this.showQuadrupleSchema()}
                </Panel>

                <Panel>
                    <Panel header="Concept Graph" bsStyle='success'>

                        <div id="sixTupleGraphMain">
                            <div className="tree" id="pairGraph">
                                <ul>
                                    <li>
                                        <ul>
                                            <li>
                                               <span className="so-label">
                                                 {this.getRoleList(triple_roles_subjObj, 3, 0)}
                                               </span>
                                                {this.getAttributeList(triple_attribbutes, 3, 0)}
                                            </li>
                                            <li>
                                              <span className="so-label">
                                                 {this.getRoleList(triple_roles_subjObj, 3, 1)}
                                              </span>
                                                {this.getAttributeList(attribute_raw_text)}
                                            </li>
                                            <li>
                                                {this.getAttributeList(triple_attribbutes, 3, 1)}
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        <ul>
                                            <li>
                                                {this.getAttributeList(triple_attribbutes, 3, 2)}
                                            </li>
                                            <li>
                                                {this.getQueryList()}
                                              <span className="so-label">
                                                 {this.getRoleList(triple_roles_subjObj, 3, 2)}
                                              </span>
                                            </li>
                                            <li>
                                                {this.getAttributeList(triple_attribbutes, 3, 3)}
                                              <span className="so-label">
                                                 {this.getRoleList(triple_roles_subjObj, 3, 3)}
                                              </span>
                                            </li>
                                        </ul>
                                       <span className="so-label">
                                         {this.getRoleList(triple_roles, 4)}
                                       </span>
                                    </li>
                                </ul>
                            </div>
                            <Button bsStyle="success" bsSize="small"
                                    onClick={this.queryHandle.bind(this, 2, 3)}>
                                Query
                            </Button>
                        </div>
                    </Panel>

                    <p id="explanationParagraph">
                        Explanation: {this.state.sixTupleExplanation}
                    </p>
                    {this.showSixTupleSchema()}
                </Panel>
            </div> );
    }

    configView() {
        var Panel = require('react-bootstrap').Panel;
        return (
            <div>
                <Panel id="mainPanel" header="Help and Configuration">

                </Panel>
            </div>
        );
    }

    aboutView() {
        var Panel = require('react-bootstrap').Panel;
        return (
            <div>
                <Panel id="mainPanel" header="About">

                </Panel>
            </div>
        );
    }

    handleQueryViewQuery() {
        console.log('Starting to query ... ');
        console.log('1 ... ');
        this.queryHandle(0, 0);
        console.log('2 ... ');
        this.queryHandle(0, 1);
        console.log('3 ... ');
        this.queryHandle(1, 2);
        console.log('4 ... ');
        //this.queryHandle(2, 3);
        console.log('5 ... ');
    }

    queryView() {
        var Button = require('react-bootstrap').Button;
        var ButtonGroup = require('react-bootstrap').ButtonGroup;
        var Navbar = require('react-bootstrap').Navbar;
        var Nav = require('react-bootstrap').Nav;
        var NavItem = require('react-bootstrap').NavItem;
        var DropdownButton = require('react-bootstrap').DropdownButton;
        var MenuItem = require('react-bootstrap').MenuItem;

        console.log('logging from the query view ');
        console.log(this.state.profilerType);

        //var categories = [];
        //for (var i = 0; i < schemaBasic.length; i++) {
        //    categories.push(<MenuItem eventKey='1'>{schemaBasic[i][0]}</MenuItem>);
        //}
        //if (this.state.profilerType == 1) { // wiki
        //}
        //else { // verb
        //    console.log('addinng the verb schemas');
        //    for (i = 0; i < schemaDep.length; i++) {
        //        categories.push(<MenuItem eventKey='1'>{schemaDep[i][0]}</MenuItem>);
        //    }
        //    for (i = 0; i < tripleSchema.length; i++) {
        //        categories.push(<MenuItem eventKey='1'>{tripleSchema[i][0]}</MenuItem>);
        //    }
        //}

        return ( <div>
            <Navbar brand='Query Configuration'>
                <Nav>
                    <DropdownButton eventKey={1} title='Profile Type'
                                    onSelect={this.handleSchemaTypeChange.bind(this)}>
                        <MenuItem eventKey='1'>Wiki Entity</MenuItem>
                        <MenuItem eventKey='2'>Verb Sense</MenuItem>
                    </DropdownButton>
                    {this.getQueryList()}
                </Nav>
            </Navbar>
            <Button
                onClick={this.handleQueryViewQuery.bind(this)}
                bsStyle="success">
                Query
            </Button>

            {this.showASetOfTables (pairwiseSchemaSimple, 0, 0)}
            {this.showASetOfTables (pairwiseSchema, 0, 1)}

            <h1> DepN  </h1>
            {this.ShowASimpleTable('DepN', 0)}
            <h1> DepNP  </h1>
            {this.ShowASimpleTable('DepNP', 0)}
            <h1> DepNER  </h1>
            {this.ShowASimpleTable('DepNER', 0)}
            <h1> DEP_COREF  </h1>
            {this.ShowATable('DEP_COREF', 2)}
            <h1> DEP_COREF_WITH_PATH_BASED_LABELS  </h1>
            {this.ShowATable('DEP_COREF_WITH_PATH_BASED_LABELS', 2)}

        </div> );
    }

        showASetOfTables (tableTitles, type, tableType) {
        var self = this;
        var schemaTables = [];
        tableTitles.forEach( function(schemaName) {
                schemaTables.push( <h3> {schemaName}  </h3> );
                if( tableType == 0 )
                    schemaTables.push( <div>  {self.ShowASimpleTable(schemaName, type)} </div> );
                else if( tableType == 1 )
                    schemaTables.push( <div>  {self.ShowATable(schemaName, type)} </div> );
            }
        );
        return (schemaTables);
    }

    render() {
        var Button = require('react-bootstrap').Button;
        var ButtonGroup = require('react-bootstrap').ButtonGroup;
        var TabPane = require('react-bootstrap').TabPane;
        var TabbedArea = require('react-bootstrap').TabbedArea;
        var ButtonToolbar = require('react-bootstrap').ButtonToolbar;
        var SplitButton = require('react-bootstrap').SplitButton;
        var MenuItem = require('react-bootstrap').MenuItem;
        var PageHeader = require('react-bootstrap').PageHeader;
        var Panel = require('react-bootstrap').Panel;
        var DropdownButton = require('react-bootstrap').DropdownButton;
        var Input = require('react-bootstrap').Input;

        //console.log("value of the ref = roleType: " + this.refs.roleType.getDOMNode());
        //console.log("value of the ref = roleType: " + React.findDOMNode(this.refs.roleType));

        var conceptGraphView = '';
        if (this.state.panelState === 1)
            conceptGraphView = this.conceptGraphView();
        var queryView = '';
        if (this.state.panelState === 2)
            queryView = this.queryView();
        var configView = '';
        if (this.state.panelState === 3)
            configView = this.configView();
        var aboutView = '';
        if (this.state.panelState === 4)
            aboutView = this.aboutView();
            return (
                <div id="mainDiv">
                    <PageHeader>
                        <h1> Profiler
                            <small> Knowledge Schemas at Scale!</small>
                        </h1>
                    </PageHeader>
                    <main className="text-center padded">
                        <section>
                            <TabbedArea defaultActiveKey={this.state.panelState}
                                        onSelect={this.handleSelectPanel.bind(this)}
                                        activeKey={this.state.panelState}>
                                <TabPane eventKey={1} tab='Per-graph view'> </TabPane>
                                <TabPane eventKey={2} tab='Profile view'> </TabPane>
                                <TabPane eventKey={3} tab='Help'> </TabPane>
                                <TabPane eventKey={4} tab='About'> </TabPane>
                            </TabbedArea>
                            <br />
                            {configView}
                            {aboutView}
                            {queryView}
                            {conceptGraphView}
                        </section>
                    </main>
                </div>
            );
    }
}

React.render(<ProfilerVisualizer />, document.body);
