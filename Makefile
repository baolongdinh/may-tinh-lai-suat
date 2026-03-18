deploy-vercel:
	@echo "$(COLOR_YELLOW)Deploying frontend to Vercel...$(COLOR_RESET)"
	@npx vercel --prod
	@echo "$(COLOR_GREEN)✓ Frontend deployment to Vercel completed$(COLOR_RESET)"