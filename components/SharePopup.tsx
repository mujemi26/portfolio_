"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { 
  Share2, 
  Copy, 
  Twitter, 
  Facebook, 
  Linkedin, 
  Mail, 
  X,
  Check
} from "lucide-react"
import { toast } from "@/hooks/use-toast"

interface SharePopupProps {
  isOpen: boolean
  onClose: () => void
  title: string
  url: string
  excerpt?: string
}

export function SharePopup({ isOpen, onClose, title, url, excerpt }: SharePopupProps) {
  const [copied, setCopied] = useState(false)

  const shareOptions = [
    {
      name: "Copy Link",
      icon: copied ? Check : Copy,
      color: "bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700",
      onClick: async () => {
        try {
          await navigator.clipboard.writeText(url)
          setCopied(true)
          toast({
            title: "Link copied!",
            description: "The link has been copied to your clipboard.",
          })
          setTimeout(() => setCopied(false), 2000)
        } catch (err) {
          toast({
            title: "Failed to copy",
            description: "Please try copying the link manually.",
            variant: "destructive",
          })
        }
      }
    },
    {
      name: "Twitter",
      icon: Twitter,
      color: "bg-blue-100 hover:bg-blue-200 dark:bg-blue-900/20 dark:hover:bg-blue-900/40",
      onClick: () => {
        const text = `${title}${excerpt ? ` - ${excerpt}` : ''}`
        const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`
        window.open(twitterUrl, '_blank')
      }
    },
    {
      name: "Facebook",
      icon: Facebook,
      color: "bg-blue-100 hover:bg-blue-200 dark:bg-blue-900/20 dark:hover:bg-blue-900/40",
      onClick: () => {
        const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
        window.open(facebookUrl, '_blank')
      }
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      color: "bg-blue-100 hover:bg-blue-200 dark:bg-blue-900/20 dark:hover:bg-blue-900/40",
      onClick: () => {
        const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
        window.open(linkedinUrl, '_blank')
      }
    },
    {
      name: "Email",
      icon: Mail,
      color: "bg-green-100 hover:bg-green-200 dark:bg-green-900/20 dark:hover:bg-green-900/40",
      onClick: () => {
        const subject = `Check out this article: ${title}`
        const body = `I thought you might be interested in this article:\n\n${title}\n\n${excerpt || ''}\n\nRead more: ${url}`
        const mailtoUrl = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
        window.open(mailtoUrl)
      }
    }
  ]

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Share2 className="h-5 w-5" />
            Share Article
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Share "{title}" with your network
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            {shareOptions.map((option) => (
              <motion.button
                key={option.name}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={option.onClick}
                className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${option.color}`}
              >
                <option.icon className="h-5 w-5" />
                <span className="text-sm font-medium">{option.name}</span>
              </motion.button>
            ))}
          </div>
          
          <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">
              Article URL:
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={url}
                readOnly
                className="flex-1 px-3 py-2 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md"
              />
              <Button
                size="sm"
                variant="outline"
                onClick={async () => {
                  try {
                    await navigator.clipboard.writeText(url)
                    setCopied(true)
                    toast({
                      title: "URL copied!",
                      description: "The article URL has been copied to your clipboard.",
                    })
                    setTimeout(() => setCopied(false), 2000)
                  } catch (err) {
                    toast({
                      title: "Failed to copy",
                      description: "Please try copying the URL manually.",
                      variant: "destructive",
                    })
                  }
                }}
              >
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
} 