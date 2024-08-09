import CategoriesPage from "@/components/templates/CategoriesPage"

function Categories({data}) {
  return (
    <CategoriesPage data={data} />
  )
}

export default Categories

export async function getServerSideProps(context){

  const {query:{difficulty , time}} = context
  
  const res = await fetch(`${process.env.BASE_URL}/data`);
  const data = await res.json();

  const filteredData = data.filter((item) => {
  //  filter based on difficulty
    const difficultyResult = item.details.filter((detail) => (detail.Difficulty && detail.Difficulty === difficulty))

     //  filter based on time
    const timeResult = item.details.filter((detail) => {
      
      // determinate cooking time
      const cookingTime = detail["Cooking Time"] || ""
      const timeDetail = cookingTime.split(" ")[0]
      // determinate cooking time
      
      if(time === "less" && timeDetail && +timeDetail <= 30) {
        return detail
      } else if( time === "more" && timeDetail && +timeDetail >30){
        return detail
      }
    })


    if(time && difficulty && timeResult.length && difficultyResult.length){
      return item
    } else if (!time && difficulty && difficultyResult.length){
      return item
    } else if (time && !difficulty && timeResult.length){
      return item
    }
  })
  


  return{
    props: {data:filteredData}
  }
}