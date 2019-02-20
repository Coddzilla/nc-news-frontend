/*



-----
- make links and routes in the app.js which takes you to an 'all articles' page.

- make different css files for each one

-check if I actually want to view all articles by topic on the home screen 

- have it so that when you click on'View all articles' it changes the class name ofthe Introduction to somethning else

- check W3Schools for different HTML sections
---------Articles.js --- 
LOADING ICON:
in state put state= { 
  isLoading: true
}

in render, if statement for if (isLoading) {
  return <h3>Loading...</h3>
}

in the then of the fetchArticles function... set the isLoading boolean to false


-------CSS
.main{
  overflow-y: auto;  
}

--------Article.js ------
class Article extends Component {
  state= {
    article: {}, 
    isLoading: true
  }
  render() {
    {article, isLoading} = this.state
    if(isLoading) {
      return (
        <h1>Loading...</h1>
      )
    }
return (
  <article>
  <h1>{article.title}</h1>
  <h2>{article.topic}</h2>  etc ...
  <h3>Author</h3>
  <Votes votes={article.votes} article_id={article.article_id}></Votes>
  <p>Body</p>
  </article>
)
  }
  componentDidMount() {
    this.fetchArticle()
  }

  fetchArticle = () => {
const {article_id} = this.props;
api.getArticle(article_id).then(article => {
  this.setState({article, isLoading:false})
})
  }
}
-----AllArticles.js
put a link to in the map for each article that takes you to the path {`/articles/${article_id}`}

remember to put this path in the router as <Article path='/articles/article_id'/>

---api.js
make fetchArticle function with article_id passed to it 


-----votes.js ----
rcc tab

class Votes extends Component {
  state = {
voteChange: 0
  }
  render() {
const {votes} = this.props;
const {voteChange} = this.state;
    return(
      <div>
      <button OnClick={() = {this.addVote(1)}} disabled={voteChange===1}>Vote up</button>
      <p>Votes: ${votes + voteChange}</p>
      <button OnClick={() = {this.addVote(-1)}} disabled={voteChange===-1} >Vote down</button>
      </div>
    )
  }

  addVote = (direction) => {
const {article_id} = this.props;
api.vote(article_id, direction)
this.setState((state) => ({{voteChange: direction + direction}}))
  }
}

-----api.js
//make it so that you can vote on comment as well or just do for article then refactor later 

export const vote = async (id, direction) => {
const {data} = await request.patch(`${baseUrl}/articles/${article_id}, inc_votes: direction)
}

------App.js
pass user down to votes through the article component/whatever compoennt is using it

----Voter.js
get user from props and put the disabled button logic in with if the author === user

*/
