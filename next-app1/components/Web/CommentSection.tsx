import { MessageSquare } from "lucide-react"
import { Card, CardHeader } from "../ui/card" 

export function CommentSection() {  
  return ( 
    <Card>
      <CardHeader>  
        <MessageSquare className="size-5" />  
        
        <h2 className="text-xl font-bold">5 comments</h2>
      </CardHeader>  
    </Card>
  ) 
}
